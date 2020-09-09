import React, { useState } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux'
import { addWatchParty } from '../actions/user'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const watchpartiesURL = 'http://localhost:3000/watchparties'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    minHeight: '70vh',
    borderRadius: '0px'
  },
  logo: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  logoSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}))

function getSteps() {
  return ['Set Party Settings', 'Invite Friends'];
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function MatchInfo() {
  const classes = useStyles()
  const steps = getSteps();
  const dispatch = useDispatch()
  const currentMatch = useSelector(state => state.matches.currentMatch)
  const currentUser = useSelector(state => state.user.currentUser)
  const friendList = useSelector(state => state.user.currentUser.friends)
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [partyName, setPartyName] = useState('');
  const [partyTime, setPartyTime] = useState(0);
  const [partyLocation, setPartyLocation] = useState('');
  const [friendIds, setFriendIds] = useState([]);

  const handleClick = () => setOpenSnack(true)

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };


  const handleClickOpen = () => {
    setPartyName(`${currentMatch.homeTeam.team_name} VS ${currentMatch.awayTeam.team_name}`)
    setPartyTime(currentMatch.event_timestamp)
    setOpen(true);
  };

  const handleClose = () => setOpen(false)
  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  const handleReset = () => setActiveStep(0)

  const handleFinish = () => {
    handleClose()
    handleReset()

    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        watchparty: {
          name: partyName,
          time: partyTime,
          location: partyLocation,
          creator_name: currentUser.name
        },
        user_id: currentUser.id,
        friend_ids: friendIds
      })
    }
    fetch(watchpartiesURL, postRequest)
      .then( resp => resp.json() )
      .then( data => {
        dispatch(addWatchParty(data))
        handleClick()
      })

    setFriendIds([])
  }

  const generateFriends = () => {
    return friendList.map( ( friend, idx ) =>
      <ListItem key={idx} style={{ paddingLeft: '40px', marginRight: '0px'}}>
        <ListItemAvatar>
          <Avatar src={friend.profile_img}/>
        </ListItemAvatar>
        <ListItemText primary={friend.name} secondary= {friend.username} />
        { !friendIds.includes(friend.id)
        && <ListItemSecondaryAction style={{ paddingRight: '0px'}}>
            <IconButton edge="end" aria-label="delete" onClick={() => setFriendIds([...friendIds, friend.id])} >
              <InsertInvitationIcon color='primary'/>
            </IconButton>
          </ListItemSecondaryAction>
        }
      </ListItem>,
    )
  }

  // vertical, horizontal
  const vertical = 'top'
  const horizontal = 'center'
  return (
    <>
      { currentMatch.fixture_id ?
        <>
          <Grid container style={{ margin: '40px 0px'}} spacing={2} justify='center' alignItems='center' >
            <Grid item xs={5}>
              <Grid container justify="center" alignItems='center' direction='column'>
                <Avatar variant='square' src={currentMatch.homeTeam.logo} className={classes.logo}/>
                  <Typography variant="h1" align="center" color="textPrimary" style={{fontSize: '1.9em', marginTop: '10px'}}>
                    {currentMatch.homeTeam.team_name}
                  </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="center" >
                <Grid container direction='column' alignItems='center' >
                  <span style={{fontSize: '2.2em'}} >{currentMatch.goalsHomeTeam} - {currentMatch.goalsAwayTeam}</span>
                  <span style={{fontSize: '1.3em'}}>{currentMatch.statusShort}</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
            <Grid container justify="center" alignItems="center" direction='column' >
                <Avatar variant='square' src={currentMatch.awayTeam.logo} className={classes.logo} />
                <Typography variant="h1" align="center" color="textPrimary" style={{fontSize: '1.9em', marginTop: '10px'}}>
                    {currentMatch.awayTeam.team_name}
                  </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{ margin: '30px 0px'}} >
            <Grid item xs={6}>
              <Grid container spacing={3} justify='center' alignItems='center' direction='column'>
                <Grid item>
                    Match League
                </Grid>
                <Grid item>
                  <Avatar variant='rounded' src={currentMatch.league.logo} />
                </Grid>
                <Grid item>
                  {currentMatch.league.name}
                </Grid>
                <Grid item>
                  <Grid container justify='center' alignItems='center' spacing={1}>
                    <Grid item>
                      <Avatar src={currentMatch.league.flag} className={classes.logoSmall} />
                    </Grid>
                    <Grid item>
                      {currentMatch.league.country}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify='center' alignItems='flex-start' direction='column' spacing={2}>
                <Grid item>
                  Date:
                    <Moment
                      style={{marginLeft: '36px'}}
                      interval={0}
                      format="MMM D, YYYY"
                      unix
                    >{currentMatch.event_timestamp}
                    </Moment>
                </Grid>
                <Grid item>
                  Time:
                    <Moment
                      style={{marginLeft: '36px'}}
                      unix
                      format="hh:mm A"
                      >{currentMatch.event_timestamp}
                      </Moment>
                </Grid>
                <Grid item>
                  Status: <span style={{marginLeft: '22px'}}>{currentMatch.status}</span>
                </Grid>
                <Grid item>
                  Round: <span style={{marginLeft: '24px'}}>{currentMatch.round}</span>
                </Grid>
                <Grid item>
                  Stadium: <span style={{marginLeft: '10px'}}>{currentMatch.venue}</span>
                </Grid>
                { currentMatch.referee &&
                  <Grid item>
                    Referee: <span style={{marginLeft: '14px'}}>{currentMatch.referee}</span>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
          { currentMatch.statusShort === "NS" ?
            <Button variant="contained" color="primary" onClick={handleClickOpen} style={{marginTop: '30px'}}>create watch party</Button>
          :
            <Button disabled variant="contained" color="primary" style={{marginTop: '30px'}}>create watch party</Button>
          }
        </>
      : 
        <Typography variant="h1" gutterBottom style={{fontSize: '1.4em', marginTop: '120px'}} >
          Select a Match to see more info...
        </Typography>
      }

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </DialogTitle>
        { activeStep === 0 ?
          <DialogContent>
            <TextField autoFocus margin="dense" label="Party Name" type="text" fullWidth value={partyName} onChange={e => setPartyName(e.target.value)}/>
            <TextField margin="dense" label="Time" type="text" fullWidth value={partyTime} onChange={e => setPartyTime(e.target.value)}/>
            <TextField margin="dense" label="Location" type="text" fullWidth onChange={e => setPartyLocation(e.target.value)} />
          </DialogContent>
        : 
          <DialogContent>
            <Grid container justify='space-evenly' alignItems='center' >
              <Grid item xs={4} style={{ width: '900px'}} >
                  <Grid container >
                    <Grid item style={{ maxWidth: '100%', flexBasis: '100%'}}>
                      <Typography variant="h5" style={{ textAlign: 'center'}}>
                        Friends
                      </Typography>
                      <Paper style={{width: '300px'}} >
                        <List style={{ height: '400px', overflow: 'auto'}}>
                          { generateFriends() }
                        </List>
                      </Paper>
                    </Grid>
                  </Grid>
              </Grid>
              {/* <Grid item xs={4}>
                <Paper elevation={5} className={classes.outerPaper}>
                <Grid container>
                  <Grid item xs={12} md={6} style={{ maxWidth: '100%', flexBasis: '100%'}}>
                    <Typography variant="h5" style={{ fontSize: '1.3em'}}>
                      Inviting Friends
                    </Typography>
                    <Paper>
                      <List style={{ height: '400px', overflow: 'auto'}} >
                        { loading
                        ? <div>Loading...</div>
                        : generateUsers(userList) }
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
                </Paper>
              </Grid> */}
            </Grid>
          </DialogContent>
        }
        <DialogActions>
          <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>Back</Button>
          {activeStep === steps.length - 1 ?
            <Button variant='contained' color='primary' onClick={handleFinish}>Finish</Button> 
          : 
            <Button variant='contained' color='primary' onClick={handleNext}>Next</Button>
          }
        </DialogActions>
      </Dialog>

      <div className={classes.root}>
        <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleSnackClose} anchorOrigin={{ vertical, horizontal }}>
          <Alert onClose={handleSnackClose} severity="success">
            Watch Party was sucessfully created
          </Alert>
        </Snackbar>
      </div>

    </>
  )
}

export default MatchInfo
