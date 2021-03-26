import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

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
    display: 'block',
    margin: '50px auto',
    fontSize: '1.2rem',
  },
}))

export default function Home() {
  console.log('renders Home')
  const classes = useStyles()
  const history = useHistory()
  const loggedIn = useSelector(state => state.user.loggedIn)

  const handleGetStarted = () => {
    loggedIn ? history.push('/games') : history.push('/login')
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Welcome to FutFriends</Typography>
        <Typography className={classes.description}>
          FutFriends is an app for soccer fanatics to browse leagues, upcoming games and setup watch parties
          with your friends.
        </Typography>
        <Button variant='contained' color='primary' className={classes.button} onClick={handleGetStarted}>
          Get Started
        </Button>
      </Paper>
    </>
  )
}
