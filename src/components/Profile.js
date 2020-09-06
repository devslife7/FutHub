import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser, logOutCurrentUser } from '../actions/user'
import { makeStyles } from '@material-ui/core/styles';
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
    marginTop: '50px'
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

function Profile({ history, logOutCurrentUser, currentUser, setCurrentUser}) {
  const classes = useStyles()
  const [ newName, setNewName ] = useState(currentUser.name)
  const [ newUserName, setNewUserName ] = useState(currentUser.username)
  const [ open, setOpen ] = useState(false)

  const handelLogOut = () => {
    localStorage.clear()
    history.push("/")
    logOutCurrentUser()
  }

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
          console.log('THIS: ', user )
            localStorage.userId = user.id
            setCurrentUser( user )
        })
    handleClose()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item xs={12} container spacing={4} className={classes.root}>
        <Grid item xs={3} >
          <Paper elevation={3} style={{ textAlign: 'center'}} >
            <Avatar src="/broken-image.jpg" style={{margin: 'auto'}}
              className={classes.large}
            />
            <Typography variant="h1" gutterBottom style={{fontSize: '1.2em'}} >
              {currentUser.name}
            </Typography>
            <Typography variant="h1" gutterBottom style={{fontSize: '1.2em'}} >
              {currentUser.username}
            </Typography>
            {/* <p>Member since: today</p> */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px'}}>
              <Button
                onClick={handleClickOpen}
                variant='outlined'
                color='primary'
                >Edit
              </Button>
              <Button
                onClick={handelLogOut}
                variant='outlined'
                color='primary'
                >Log out
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={9} >
          <Paper elevation={3} >
            <h3 style={{ fontFamily: 'roboto'}}>{currentUser.name}</h3>
            <h3>{currentUser.username}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px'}}>
              <Button
                // onClick={handleClickOpen}
                variant='outlined'
                color='primary'
                >Edit
              </Button>
              <Button
                onClick={handelLogOut}
                variant='outlined'
                color='primary'
                >Log out
              </Button>
            </div>
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

const mapDispatchToProps = dispatch => {
  return {
    logOutCurrentUser: () => {
      dispatch(logOutCurrentUser())
    },
    setCurrentUser: user => {
      dispatch(setCurrentUser(user))
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
