import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser, logOutCurrentUser } from '../actions/user'
import { makeStyles } from '@material-ui/core/styles';
import LeagueCardSmall from './LeagueCardSmall'
import FriendCard from './FriendCard'
import WatchPartyCard from './WatchPartyCard'
import InvitationCard from './InvitationCard'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'

const usersURL = 'http://localhost:3000/users/'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '15px'
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  }
}))

function Profile({ history}) {
  const classes = useStyles()
  const currentUser = useSelector(state => state.user.currentUser)
  const friends = useSelector(state => state.user.currentUser.friends)
  const dispatch = useDispatch()
  const [ newName, setNewName ] = useState(currentUser.name)
  const [ newUserName, setNewUserName ] = useState(currentUser.username)
  const [ open, setOpen ] = useState(false)

  const handelLogOut = () => {
    localStorage.clear()
    history.push("/")
    dispatch(logOutCurrentUser())
  }

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleEditUser = () => {
    console.log('editing user...')

    const patchRequest = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            username: newUserName
        })
    }

    fetch(usersURL + currentUser.id, patchRequest)
        .then( resp => resp.json() )
        .then( user => {
            localStorage.userId = user.id
            dispatch(setCurrentUser(user))
        })
    handleClose()
  }

  const renderFavLeagues = () => {
    console.log('renders leagues')
    return currentUser.favLeagues.map( (league, idx) => 
        <Grid key={idx} item xs={4}>
          <LeagueCardSmall currentLeague={league}/>
        </Grid>
    )
  }
  const renderFriends = () => {
    return currentUser.friends.map( (friend, idx) => 
        <Grid key={idx} item xs={2}>
          <FriendCard friend={friend}/>
        </Grid>
    )
  }

  const renderWatchParties = () => {
    return currentUser.watchparties.map( (party, idx) => 
        <Grid key={idx} item xs={3}>
          <WatchPartyCard party={party}/>
        </Grid>
    )
  }
  const renderInvitations = () => {
    return currentUser.invitations.map( (invitation, idx) => 
        <Grid key={idx} item xs={3}>
          <InvitationCard invitation={invitation}/>
        </Grid>
    )
  }

  return (
    <>
      <Grid item xs={12} container spacing={4} className={classes.root}>
        <Grid item xs={3} >
          <Paper elevation={3} style={{ textAlign: 'center', padding: '30px'}} >
            <Avatar src="/broken-image.jpg" style={{margin: 'auto'}}
              className={classes.large}
            />
            <Typography variant="h1" gutterBottom style={{fontSize: '1.2em', marginTop: '20px'}} >
              {currentUser.name}
            </Typography>
            <Typography variant="h1" gutterBottom style={{fontSize: '1.2em', margin: '20px 0px'}} >
              {currentUser.username}
            </Typography>
            <Typography color='textSecondary'gutterBottom style={{fontSize: '1em', marginTop: '10px'}} >
              Parties: {currentUser.watchparties.length}
            </Typography>
            <Typography color='textSecondary'gutterBottom style={{fontSize: '1em', marginTop: '10px'}} >
              Friends: {friends.length}
            </Typography>
            <Typography color='textSecondary'gutterBottom style={{fontSize: '1em', marginTop: '10px'}} >
              Leagues: {currentUser.favLeagues.length}
            </Typography>
            <Typography color='textSecondary'gutterBottom style={{fontSize: '1em', marginTop: '10px'}} >
              Invitations: {currentUser.invitations.length}
            </Typography>
              <Grid container direction='column' spacing={3}>
                  <Button
                    style={{ margin: '40px 0px 0px 0px'}}
                    onClick={handleClickOpen}
                    variant='contained'
                    color='primary'
                    >Edit
                  </Button>
                  <Button
                    style={{ margin: '20px 0px 0px 0px'}}
                    onClick={handelLogOut}
                    variant='outlined'
                    color='primary'
                    >Log out
                  </Button>
              </Grid>
          </Paper>
        </Grid>

        <Grid item xs={9} >
          <Paper elevation={3} style={{ padding: '30px'}}>
            <Typography variant="h1" gutterBottom style={{fontSize: '1.2em', marginTop: '0px'}} >
              Favorite Leagues:
            </Typography>
            <Grid container spacing={2}>
              {renderFavLeagues()}
            </Grid>
            <Typography variant="h1" gutterBottom style={{fontSize: '1.2em', marginTop: '20px'}} >
              Friends:
            </Typography>
            <Grid container spacing={2}>
              {renderFriends()}
            </Grid>
            <Typography variant="h1" gutterBottom style={{fontSize: '1.2em', marginTop: '20px'}} >
              WatchParties:
            </Typography>
            <Grid container spacing={2}>
              {renderWatchParties()}
            </Grid>
            <Typography variant="h1" gutterBottom style={{fontSize: '1.2em', marginTop: '20px'}} >
              Invitations:
            </Typography>
            <Grid container spacing={2}>
              {renderInvitations()}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
      <form className={classes.container} style={{ width: '250px'}}> 
      <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          value={newName}
          onChange={ e => setNewName( e.target.value )}
      />
      <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={newUserName}
          onChange={ e => setNewUserName( e.target.value )}
      />
      <TextField
          margin="normal"
          fullWidth
          id="img"
          label="Image Url"
          name="img"
          autoComplete="img"
      />
      </form>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose} color="primary">
          Cancel
      </Button>
      <Button onClick={handleEditUser} color="primary">
          Submit
      </Button>
      </DialogActions>
  </Dialog>
    </>
  )
}

export default Profile
