import React, { useState } from 'react'
import { connect } from 'react-redux'
import { logOutCurrentUser } from '../actions/user'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'

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

function Profile({ history, logOutCurrentUser}) {
  const currentUser = JSON.parse(localStorage.currentUser)
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

    // fetch(userURL + currentUser.id, patchRequest)
    //     .then( resp => resp.json() )
    //     .then( data => {
    //         localStorage.username = data.user.username
    //         localStorage.name = data.user.name
    //         localStorage.userData = JSON.stringify( data.user )
    //         setCurrentUser( data.user )
    //     })
    
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
            <h3 style={{ fontFamily: 'roboto'}}>{currentUser.name}</h3>
            <h3>{currentUser.username}</h3>
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
    }
  }
}

export default connect(null, mapDispatchToProps)(Profile)
