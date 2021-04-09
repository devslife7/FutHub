import React from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '30px',
    padding: '50px',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '600',
    textAlign: 'center',
    margin: '80px 0',
  },
  description: {
    fontSize: '1.6rem',
    textAlign: 'center',
    color: 'gray',
    margin: '0 100px',
  },
  button: {
    display: 'block',
    margin: '140px auto',
    fontSize: '1.3rem',
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
          FutFriends is an app for soccer fanatics who enjoy watching soccer games with their friends but
          coordinating a watch party is not always that easy. Here you can browse leagues, upcoming games and
          setup watch parties with your friends.
        </Typography>
        <Button variant='contained' color='primary' className={classes.button} onClick={handleGetStarted}>
          Get Started
        </Button>
      </Paper>
    </>
  )
}
