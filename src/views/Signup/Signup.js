import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/actions/user'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

const serverURL = process.env.REACT_APP_SERVER_URL
const signUpURL = serverURL + '/signup/'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Signup({ history }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const openSnackBar = message => {
    let errorMessage = ''

    for (const property in message) {
      errorMessage += `${property} ${message[property][0]}. `
    }

    setError(errorMessage)
    setOpen(true)
  }

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSignup = e => {
    e.preventDefault()
    setIsLoading(true)

    let user = {
      user: {
        name: name,
        username: username,
        password: password,
      },
    }
    let postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }

    fetch(signUpURL, postRequest)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          openSnackBar(data.error)
        } else {
          localStorage.token = data.token
          localStorage.userId = data.user.id
          dispatch(setCurrentUser(data.user))
          history.push('/profile')
        }
        setIsLoading(false)
      })
      .catch(err => console.log('Sign Up fetch error: ', err))
  }

  const vertical = 'top'
  const horizontal = 'center'
  return (
    <Container component='main' maxWidth='xs'>
      <Paper style={{ padding: '38px', marginTop: '10vh' }}>
        <Typography component='h1' style={{ fontSize: '1.9em', color: '#2196f3' }}>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='name'
                name='Name'
                variant='outlined'
                required
                fullWidth
                id='Name'
                label='Name'
                autoFocus
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isLoading ? (
              <CircularProgress style={{ width: '30px', height: '30px', color: 'inherit' }} />
            ) : (
              'SignUp'
            )}
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login' style={{ textDecoration: 'none', color: '#2196f3' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box mt={5}>
        <Typography variant='body2' align='center' style={{ color: 'white' }}>
          Copyright © FutFriends {new Date().getFullYear()}
        </Typography>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity='error'>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}
