import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

// import { addFavoriteLeague, removeFavoriteLeague } from '../actions/user';
import { removeWatchParty } from '../actions/user'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';



const watchPartyURL = 'http://localhost:3000/watchparties/'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    width: '180px',
    height: '200px'
  },
  image: {
    width: 40,
    height: 40,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function WatchPartyCard({ party }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)

  const handleDelete = () => {
    fetch(watchPartyURL + party.id, { method: 'DELETE' })
      .then(resp => resp.json() )
      .then( data => {
        console.log(data)
        dispatch(removeWatchParty(party.id))
      })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant="h1" gutterBottom style={{fontSize: '1em'}} >
              {party.name}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container style={{marginTop: '10px'}}>
              <Avatar src={party.home_team_logo} style={{margin: 'auto', marginBottom: '0px'}}
                className={classes.image}
              />
              <Typography variant="subtitle1">
              {party.time}
            </Typography>

              <Avatar src={party.away_team_logo} style={{margin: 'auto', marginBottom: '0px'}}
                className={classes.image}
              />
            </Grid>
          </Grid>
          <Grid item style={{margin: 'auto'}}>
            <Typography variant="subtitle1">
              <Moment
                style={{marginLeft: '30px'}}
                interval={0}
                format="MMM D, YYYY"
                unix
              >{party.timestamp}
              </Moment>

            </Typography>
            <Typography variant="subtitle1">
              Where: {party.location}
            </Typography>
            { currentUser.name === party.creator_name &&
              <IconButton onClick={() => console.log(party)}>
                <EditIcon color='primary'/>
              </IconButton>
            }
            <IconButton onClick={handleDelete} >
              <DeleteIcon color='error'/>
            </IconButton>
            <IconButton onClick={() => console.log(party)}>
              <MoreVertIcon style={{color: 'green'}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default WatchPartyCard