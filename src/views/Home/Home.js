import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '10px',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '300',
    textAlign: 'center',
  },
  description: {
    fontSize: '1rem',
    textAlign: 'center',
    color: 'gray',
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
        <Button variant='outlined' style={{ textDecoration: 'none' }}>
          Get Started
        </Button>
      </Paper>
    </>
  )
}
