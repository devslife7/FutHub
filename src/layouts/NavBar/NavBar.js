import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { logOutCurrentUser } from '../../actions/user'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import Grid from '@material-ui/core/Grid'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer'

const useStyles = makeStyles(theme => ({
  logoContainer: {
    flexGrow: '1',
    display: 'flex',
  },
  logoLink: {
    display: 'flex',
    padding: '5px',
    cursor: 'pointer',
    color: '#fff',
  },
  logoIcon: {
    paddingRight: '5px',
    fontSize: '2.6em',
  },
  logoText: {
    fontSize: '1.8em',
    fontWeight: '400',
  },
  navBar: {
    padding: '0px',
    minHeight: '70px',
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  links: {
    fontSize: '1.14em',
    color: '#fff',
    margin: '0px 0px',
    padding: '14px 20px 14px 20px',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',

    '&:hover': {
      color: 'rgb(255, 255, 255, 0.6)',
    },
  },
  linkClicked: {
    borderBottom: '2px solid',
  },
  button: {
    backgroundColor: '#2196f3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
}))

export default function NavBar() {
  console.log('--------------------')
  console.log('renders NavBar')
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const loggedIn = useSelector(state => state.user.loggedIn)
  const [linkClicked, setLinkClicked] = useState('')

  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const isMenuLinkClicked = linkName => {
    return linkClicked === linkName && classes.linkClicked
  }

  const handleProfileOptions = event => {
    setLinkClicked('profile')
    handleClick(event)
  }

  const handleLogOut = () => {
    handleClose()
    localStorage.clear()
    dispatch(logOutCurrentUser())
  }

  const popoverDisplay = currentUser => {
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
      <>
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
          <Paper elevation={0} style={{ padding: '20px' }}>
            <Grid container direction='column' alignItems='center'>
              <Typography variant='h1' gutterBottom style={{ fontSize: '1.2em', margin: '10px' }}>
                {currentUser.name}
              </Typography>
              {currentUser.invitations.length > 0 ? (
                <Typography variant='h1' gutterBottom style={{ fontSize: '1.2em', margin: '10px' }}>
                  {currentUser.invitations.length} new invite(s)
                </Typography>
              ) : null}
              <Typography variant='h1' gutterBottom style={{ fontSize: '1.2em', margin: '10px' }}>
                {currentUser.username}
              </Typography>
              <Link to='/profile' onClick={handleClose} style={{ textDecoration: 'none' }}>
                <Button
                  variant='contained'
                  color='primary'
                  style={{ padding: '5px 100px', margin: '20px 0px' }}
                >
                  Profile
                </Button>
              </Link>
              <Link style={{ textDecoration: 'none' }} onClick={handleLogOut} to='/login'>
                <Button variant='outlined' color='primary' style={{ padding: '5px 98px' }}>
                  Log Out
                </Button>
              </Link>
            </Grid>
          </Paper>
        </Popover>
      </>
    )
  }

  return (
    <>
      <AppBar position='sticky' color='primary'>
        <Container>
          <Toolbar className={classes.navBar}>
            <div className={classes.logoContainer}>
              <Link to='/' className={classes.logoLink} onClick={() => setLinkClicked('Home')}>
                <SportsSoccerIcon className={classes.logoIcon} />
                <Typography className={classes.logoText}>FutFriends</Typography>
              </Link>
            </div>

            <Link
              to='/leagues'
              onClick={() => setLinkClicked('Leagues')}
              className={`${isMenuLinkClicked('Leagues')} ${classes.links} ${classes.onHover}`}
            >
              Leagues
            </Link>
            <Link
              to='/games'
              onClick={() => setLinkClicked('Games')}
              className={`${isMenuLinkClicked('Games')} ${classes.links} ${classes.onHover}`}
            >
              Games
            </Link>
            {loggedIn ? (
              <>
                <Link
                  onClick={() => setLinkClicked('Favorites')}
                  className={`${isMenuLinkClicked('Favorites')} ${classes.links} ${classes.onHover}`}
                  to='/favorites'
                >
                  Favorites
                </Link>
                <Link
                  onClick={() => setLinkClicked('Friends')}
                  className={`${isMenuLinkClicked('Friends')} ${classes.links} ${classes.onHover}`}
                  to='/friends'
                >
                  {' '}
                  Friends
                </Link>
                {/* <Divider orientation='vertical' style={{ height: '36px' }} /> */}
                <Link
                  to='#'
                  onClick={handleProfileOptions}
                  className={`${isMenuLinkClicked('profile')} ${classes.links} ${classes.onHover}`}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {' '}
                  {currentUser.name}
                  <Badge badgeContent={currentUser.invitations.length} color='secondary'>
                    <Avatar
                      src={currentUser.profile_img}
                      style={{ marginLeft: '6px' }}
                      className={classes.small}
                    />
                  </Badge>
                </Link>
                {popoverDisplay(currentUser)}
              </>
            ) : (
              <Link
                to='/login'
                onClick={() => setLinkClicked('Login')}
                className={`${isMenuLinkClicked('Login')} ${classes.links} ${classes.onHover}`}
              >
                Login
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
