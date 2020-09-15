import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux'
import { setCurrentUser, logOutCurrentUser } from '../actions/user'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper'

const logInURL = 'http://localhost:3000/login'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{color: 'white'}}>
      {'Copyright © '}
      {' FutFriends '}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
}));

function LogIn({ history }) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  useEffect( () => {
    localStorage.clear() // clears the localStorage data upon component mount
    dispatch(logOutCurrentUser())
  }, [dispatch] )

  const openSnackBar = () => setOpen(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault()
    let user = {
      user: {
        username: username,
        password: password
      }
    }
    let postRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }

    fetch( logInURL, postRequest )
      .then(resp => resp.json())
      .then(data => {
        if (data.error){
          openSnackBar()
        }
        else {
          localStorage.token = data.token
          localStorage.userId = data.user.id
          console.log('this is the data.user from fetch: ', data.user)
          dispatch(setCurrentUser(data.user))
          history.push("/profile")
        }
      })
  }

  const vertical = 'top'
  const horizontal = 'center'
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper style={{padding: '38px', marginTop: '10vh'}}>
        <Typography component="h1" variant="h5" style={{color:'#2196f3'}}>
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => handleLogin(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={ (e) => {
              setUsername(e.target.value)
            } }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={ (e) => {setPassword(e.target.value)} }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2" style={{textDecoration: 'none', color:'#2196f3'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} >
        <Alert onClose={handleClose} severity="error">
          Invalid Username or Password
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default LogIn