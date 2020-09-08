import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { logOutCurrentUser } from '../actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontSize: '1.55em',
    fontWeight: '400'
  },
  navBarPadding: {
    padding: '0px'
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  linkNotClicked: {
    borderRadius: '0px',
  },
  linkClicked: {
    borderRadius: '0px',
    borderBottom: '2px solid',
  },
  links: {
    textDecoration: 'none',
    fontSize: '1.14em',
    color: 'white',
    margin: '0px 0px',
    padding: '14px 20px 14px 20px',
  },
  typography: {
    padding: theme.spacing(2),
  },
  button: {
    backgroundColor: '#2196f3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    margin: '10px',
    padding: '7px 18px',
  },
  onHover: {
    "&:hover": {
      color: 'rgb(255, 255, 255, 0.6)',
    }
  }
}))

function NavBar() {
  console.log('--------------------')
  console.log('renders NavBar')
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const loggedIn = useSelector(state => state.user.loggedIn)
  const [ linkClicked, setLinkClicked ] = useState('Leagues')

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const isMenuLinkClicked = linkName => {
    return linkClicked === linkName ? classes.linkClicked : classes.linkNotClicked
  }

  const handleProfileOptions = (event) => {
    handleClick(event)
  }

  const handleLogOut = () => {
    handleClose()
    localStorage.clear()
    dispatch(logOutCurrentUser())
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color='primary'>
        <Container>
          <Toolbar className={classes.navBarPadding}>
            <Typography variant="h1" className={classes.title}>
              FutFriends
            </Typography>
              <Link
                to="/"
                onClick={ () => setLinkClicked('Leagues')}
                className={`${isMenuLinkClicked('Leagues')} ${classes.links} ${classes.onHover}`}
              >Leagues
              </Link>
              <Link
                to="/upcoming"
                onClick={ () => setLinkClicked('Games')}
                className={`${isMenuLinkClicked('Games')} ${classes.links} ${classes.onHover}`} 
              >Games
              </Link>
            { loggedIn
            ? <div>
                <Link
                  onClick={ () => setLinkClicked('Favorites')}
                  className={`${isMenuLinkClicked('Favorites')} ${classes.links} ${classes.onHover}`}
                  to="/favorites"
                  >Favorites
                </Link>
                <Link
                  onClick={ () => setLinkClicked('Friends')}
                  className={`${isMenuLinkClicked('Friends')} ${classes.links} ${classes.onHover}`}
                  to="/friends"
                  > Friends
                </Link>
              </div>
            : null
            }
            { loggedIn
            ? 
            <>
              <Divider orientation="vertical" style={{height: '36px'}}/>
              <Link to="#"
                onClick={handleProfileOptions}
                className={`${isMenuLinkClicked('profile')} ${classes.links} ${classes.onHover}`}
                style={{ display: 'flex', alignItems: 'center' }}
                > {currentUser.name}
                <Avatar
                  src="/broken-image.jpg"
                  style={{marginLeft: '6px'}}
                  className={classes.small}
                />
              </Link>
              </>
            : <Link
                onClick={ () => setLinkClicked('Login')}
                className={`${isMenuLinkClicked('Login')} ${classes.links} ${classes.onHover}`}
                to="/login"
                >Login
              </Link>
            }
          </Toolbar>
        </Container>
      </AppBar>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper elevation={0} style={{ textAlign: 'center', padding: '30px'}}>
          <Avatar src="/broken-image.jpg" style={{margin: '0px auto'}}
            className={classes.large}
          />
          { loggedIn
          &&
          <div>
            <h3>{currentUser.name}</h3>
            <h3>{currentUser.username}</h3>
          </div>
          }
          <Link
            onClick={handleClose}
            className={classes.button}
            to="/profile"
            >Profile
          </Link>
          <Link
            onClick={handleLogOut}
            className={classes.button}
            to="/"
            >Log Out
          </Link>
        </Paper>
      </Popover>
    </div>
  );
}

export default NavBar