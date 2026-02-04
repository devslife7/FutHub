import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser, logOutCurrentUser } from '../../redux/actions/user'
import { makeStyles } from '@material-ui/core/styles'
import FriendCard from '../../components/FriendCard'
import { InvitationCard, LeagueCardSmall, WatchPartyCard } from './components'
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
import InputLabel from '@material-ui/core/InputLabel'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '10px',
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  paperProfile: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#fff',
  },
  placeholderMessage: {
    width: '100%',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.5)',
    fontSize: '1.2rem',
    padding: '0rem',
  },
  userDataTitle: {
    fontSize: '1.4em',
    fontWeight: 400,
  },
  userData: {
    padding: '0.5rem 0 2rem 0',
  },
}))

export default function Profile({ history }) {
  const classes = useStyles()
  const currentUser = useSelector(state => state.user.currentUser)
  const loggedIn = useSelector(state => state.user.loggedIn)
  const friends = useSelector(state => state.user.currentUser.friends)
  const dispatch = useDispatch()
  const [newName, setNewName] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [open, setOpen] = useState(false)

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!loggedIn) {
      history.push('/login')
    }
  }, [loggedIn, history])

  const handelLogOut = () => {
    localStorage.clear()
    history.push('/')
    dispatch(logOutCurrentUser())
  }

  const handleClickOpen = () => {
    setNewName(currentUser.name)
    setNewUserName(currentUser.username)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleEditUser = () => {
    // Mock implementation - just update the user in Redux
    const updatedUser = {
      ...currentUser,
      name: newName,
      username: newUserName,
    }

    dispatch(setCurrentUser(updatedUser))
    handleUploadAvatar()
    handleClose()
  }

  const renderFavLeagues = () => {
    if (currentUser.favLeagues.length === 0) {
      return (
        <Typography className={classes.placeholderMessage}>No leagues selected as favorite...</Typography>
      )
    } else {
      return currentUser.favLeagues.map((league, idx) => (
        <Grid key={idx} item xs={4}>
          <LeagueCardSmall currentLeague={league} />
        </Grid>
      ))
    }
  }
  const renderFriends = () => {
    if (currentUser.friends.length === 0) {
      return <Typography className={classes.placeholderMessage}>You have no friends...</Typography>
    } else {
      return currentUser.friends.map((friend, idx) => (
        <Grid key={idx} item xs={2}>
          <FriendCard friend={friend} />
        </Grid>
      ))
    }
  }

  const renderWatchParties = () => {
    if (currentUser.watchparties.length === 0) {
      return <Typography className={classes.placeholderMessage}>No upcoming watchparties...</Typography>
    } else {
      return currentUser.watchparties.map((party, idx) => (
        <Grid key={idx} item xs={3}>
          <WatchPartyCard party={party} />
        </Grid>
      ))
    }
  }
  const renderInvitations = () => {
    if (currentUser.invitations.length === 0) {
      return <Typography className={classes.placeholderMessage}>No invitations...</Typography>
    } else {
      return currentUser.invitations.map((invitation, idx) => (
        <Grid key={idx} item xs={3}>
          <InvitationCard invitation={invitation} />
        </Grid>
      ))
    }
  }

  // avatar upload state
  const [avatar, setAvatar] = useState('')

  const handleUploadAvatar = () => {
    // Mock implementation - just update the avatar in Redux if one is selected
    if (!!avatar) {
      const updatedUser = {
        ...currentUser,
        profile_img: URL.createObjectURL(avatar),
      }
      dispatch(setCurrentUser(updatedUser))
      setAvatar('')
    }
  }

  return (
    <>
      <Grid item xs={12} container spacing={4} className={classes.root}>
        <Grid item xs={3}>
          <Paper elevation={3} className={classes.paperProfile}>
            <Avatar src={currentUser.profile_img} style={{ margin: 'auto' }} className={classes.large} />
            <Typography variant='h1' gutterBottom style={{ fontSize: '1.2em', marginTop: '20px' }}>
              {currentUser.name}
            </Typography>
            <Typography variant='h1' gutterBottom style={{ fontSize: '1.2em', margin: '20px 0px' }}>
              {currentUser.username}
            </Typography>
            <Typography color='textSecondary' gutterBottom style={{ fontSize: '1em', marginTop: '10px' }}>
              Parties: {currentUser.watchparties.length}
            </Typography>
            <Typography color='textSecondary' gutterBottom style={{ fontSize: '1em', marginTop: '10px' }}>
              Friends: {friends.length}
            </Typography>
            <Typography color='textSecondary' gutterBottom style={{ fontSize: '1em', marginTop: '10px' }}>
              Leagues: {currentUser.favLeagues.length}
            </Typography>
            <Typography color='textSecondary' gutterBottom style={{ fontSize: '1em', marginTop: '10px' }}>
              Invitations: {currentUser.invitations.length}
            </Typography>
            <Grid container direction='column' spacing={3}>
              <Button
                style={{ margin: '40px 0px 0px 0px' }}
                onClick={handleClickOpen}
                variant='contained'
                color='primary'
              >
                Edit
              </Button>
              <Button
                style={{ margin: '20px 0px 0px 0px' }}
                onClick={handelLogOut}
                variant='outlined'
                color='primary'
              >
                Log out
              </Button>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <Paper elevation={3} style={{ padding: '1.5rem 2rem' }}>
            <Typography variant='h1' gutterBottom className={classes.userDataTitle}>
              Favorite Leagues:
            </Typography>
            <Grid container spacing={2} className={classes.userData}>
              {renderFavLeagues()}
            </Grid>
            <Typography variant='h1' gutterBottom className={classes.userDataTitle}>
              Friends:
            </Typography>
            <Grid container spacing={2} className={classes.userData}>
              {renderFriends()}
            </Grid>
            <Typography variant='h1' gutterBottom className={classes.userDataTitle}>
              WatchParties:
            </Typography>
            <Grid container spacing={2} className={classes.userData}>
              {renderWatchParties()}
            </Grid>
            <Typography variant='h1' gutterBottom className={classes.userDataTitle}>
              Invitations:
            </Typography>
            <Grid container spacing={2} className={classes.userData}>
              {renderInvitations()}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <form className={classes.container} style={{ width: '250px' }}>
            <TextField
              margin='normal'
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <TextField
              margin='normal'
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              value={newUserName}
              onChange={e => setNewUserName(e.target.value)}
            />
            <InputLabel htmlFor='my-input' style={{ margin: '20px 0px' }}>
              Upload Avatar Image
            </InputLabel>
            <input
              id='customFile'
              type='file'
              placeholder='hello'
              onChange={e => setAvatar(e.target.files[0])}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleEditUser} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
