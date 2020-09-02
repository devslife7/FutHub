import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

function profile() {
  // const currentUser = JSON.parse(localStorage.currentUser)
  return (
    <Grid item xs={6} container direction='column' justify='space-between' alignItems='center' spacing={8}>
      <Grid item xs={12} >
        <Paper elevation={6} style={{ textAlign: 'center', padding: '30px', width: '350px'}}>
          <Avatar src="/broken-image.jpg" style={{margin: 'auto'}}
            // className={classes.large}
          />
          <h3 style={{ fontFamily: 'roboto'}}>Welcome, {/*currentUser.name*/}!</h3>
          <h3>username{/*user.username*/}</h3>
          <p>Member since: created at{ /*createAt*/ }</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px'}}>
            <Button
              // onClick={handleClickOpen}
              variant='outlined'
              color='primary'
              >Edit
            </Button>
            <Button
              // onClick={handelLogOut}
              variant='outlined'
              color='primary'
              >Log out
            </Button>
          </div>
        </Paper>
      </Grid>
      
      {/* <Grid item xs={12} >
        <Paper elevation={4} style={{ height: '90px'}}>
          <div
          // className={classes.buttonStyle}
          >
            <Button
              // onClick={handleCreateGame}
              variant='contained'
              style={{ backgroundColor: '#81c784', color: 'white', padding: '20px 20px'}}
              >Create Game
            </Button>
            <Button
              // onClick={handleJoinGame}
              variant='contained'
              style={{ backgroundColor: '#4791db', color: 'white', padding: '20px 20px'}}>
              Join Game
            </Button>
          </div>
        </Paper>
      </Grid> */}
    </Grid>
  )
}

export default profile
