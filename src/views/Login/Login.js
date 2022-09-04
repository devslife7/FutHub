import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser, logOutCurrentUser } from '../../redux/actions/user'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

const serverURL = process.env.REACT_APP_SERVER_URL
const logInURL = serverURL + '/login/'

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signUpLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontFamily: 'Arial',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  guestLoginLink: {
    border: 'none',
    backgroundColor: 'white',
    fontSize: '1rem',
    padding: 0,
    marginTop: '1rem',

    cursor: 'pointer',
    color: theme.palette.primary.main,

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default function Login({ history }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.clear() // clears the localStorage data upon component mount
    dispatch(logOutCurrentUser())
  }, [dispatch])

  const openSnackBar = () => setOpen(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  const handleLogin = async e => {
    e.preventDefault()
    setIsLoading(true)

    let requestBody = {
      user: {
        username: username,
        password: password,
      },
    }

    try {
      const response = await axios.post(logInURL, requestBody)
      const data = response.data

      localStorage.token = data.token
      dispatch(setCurrentUser(data.user))
      resetForm()
      history.push('/profile')
    } catch (err) {
      setErrorMessage(err.response.data.error)
      openSnackBar()
      resetForm()
      return
    }
  }

  const resetForm = () => {
    setUsername('')
    setPassword('')
    setIsLoading(false)
  }

  const handleGuestLogin = () => {
    setUsername('Guest')
    setPassword('guest')
  }

  const vertical = 'top'
  const horizontal = 'center'
  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Paper style={{ padding: '38px', marginTop: '10vh' }}>
          <Typography component='h1' variant='h5' style={{ color: '#2196f3' }}>
            Login
          </Typography>

          <form className={classes.form} noValidate onSubmit={e => handleLogin(e)}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              onChange={e => {
                setUsername(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={e => {
                setPassword(e.target.value)
              }}
            />
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isLoading ? (
                <CircularProgress style={{ width: '30px', height: '30px', color: 'inherit' }} />
              ) : (
                'Log In'
              )}
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/signup' variant='body2' className={classes.signUpLink}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>

              <Grid item>
                <button type='submit' className={classes.guestLoginLink} onClick={handleGuestLogin}>
                  Login as Guest
                </button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box mt={8}>
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
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}
