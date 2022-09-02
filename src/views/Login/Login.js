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
  demoLogin: {
    margin: '30px 0 15px 0',
    borderRadius: '5px',
    color: theme.palette.primary.main,
    fontSize: '18px',
  },
}))

export default function Login({ history }) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    localStorage.clear() // clears the localStorage data upon component mount
    dispatch(logOutCurrentUser())
  }, [dispatch])

  const openSnackBar = () => setOpen(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleLogin = async e => {
    e.preventDefault()
    let requestBody = {
      user: {
        username: username,
        password: password,
      },
    }
    // let postRequest = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(requestBody),
    // }

    const response = await axios.post(logInURL, requestBody)
    const data = response.data
    console.log('response: ', data)

    if (data.error) {
      console.log(data.error)
      openSnackBar()
    } else {
      localStorage.token = data.token
      localStorage.userId = data.user.id
      dispatch(setCurrentUser(data.user))
      history.push('/profile')
    }

    // fetch(logInURL, postRequest)
    //   .then(resp => resp.json())
    //   .then(data => {
    //     if (data.error) {
    //       openSnackBar()
    //     } else {
    //       localStorage.token = data.token
    //       localStorage.userId = data.user.id
    //       dispatch(setCurrentUser(data.user))
    //       history.push('/profile')
    //     }
    //   })
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

          <div className={classes.demoLogin}>Demo Login: demo/demo</div>

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
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/signup' variant='body2' style={{ textDecoration: 'none', color: '#2196f3' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
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
            {/* Invalid Username or Password */}
            testing
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}
