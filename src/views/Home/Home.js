import React from 'react'
import 'date-fns'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: '30px',
    padding: '50px',
  },
  title: {
    fontSize: '3.7rem',
    fontWeight: '600',
    textAlign: 'center',
    margin: '8rem 0 3rem 0',
    color: 'white',
  },
  description: {
    fontSize: '1.5rem',
    textAlign: 'center',
    color: 'white',
    margin: '0 auto',
    maxWidth: '70rem',
  },
  button: {
    display: 'block',
    margin: '70px auto',
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
      <Typography className={classes.title}>Welcome to FutFriends</Typography>
      <Typography className={classes.description}>
        FutFriends is an app for soccer fanatics who enjoy watching soccer games with their friends but
        coordinating a watch party is not always that easy. Here you can browse leagues, upcoming games and
        setup watch parties with your friends.
      </Typography>
      <Button variant='contained' color='primary' className={classes.button} onClick={handleGetStarted}>
        Get Started
      </Button>
    </>
  )
}
