import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '30px',
    padding: '50px',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '300',
    textAlign: 'center',
    margin: '50px 0',
  },
  description: {
    fontSize: '1.5rem',
    textAlign: 'center',
    color: 'gray',
    margin: '50px 100px',
  },
  button: {
    margin: '50px 0',
  },
}))

export default function Home() {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Welcome to FutFriends</Typography>
        <Typography className={classes.description}>
          FutFriends is an app for soccer fanatics to browse leagues, upcoming games and setup watch parties
          with your friends.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          style={{ backgroundColor: 'red' }}
        >
          Get Started
        </Button>
      </Paper>
    </>
  )
}
