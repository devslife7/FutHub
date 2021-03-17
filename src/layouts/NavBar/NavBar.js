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
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontSize: '1.55em',
    fontWeight: '400',
  },
  navBarPadding: {
    padding: '0px',
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
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
    transition: 'all 0.3s ease',
  },
  typography: {
    padding: theme.spacing(2),
  },
  button: {
    backgroundColor: '#2196f3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  onHover: {
    '&:hover': {
      color: 'rgb(255, 255, 255, 0.6)',
    },
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

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const isMenuLinkClicked = linkName => {
    return linkClicked === linkName ? classes.linkClicked : classes.linkNotClicked
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

  return (
    <div>
      <AppBar position='sticky' color='primary'>
        <Container>
          <Toolbar className={classes.navBarPadding}>
            <SportsSoccerIcon style={{ paddingRight: '6px', fontSize: '2.6em' }} />
            <Typography variant='h1' className={classes.title}>
              FutFriends
            </Typography>

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
              <div>
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
              </div>
            ) : null}
            {loggedIn ? (
              <>
                <Divider orientation='vertical' style={{ height: '36px' }} />
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
              </>
            ) : (
              <Link
                onClick={() => setLinkClicked('Login')}
                className={`${isMenuLinkClicked('Login')} ${classes.links} ${classes.onHover}`}
                style={{ display: 'flex', alignItems: 'center' }}
                to='/login'
              >
                Login
              </Link>
            )}
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
        <Paper elevation={0} style={{ padding: '20px' }}>
          {loggedIn && (
            <>
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
                <Link style={{ textDecoration: 'none' }} onClick={handleLogOut} to='/'>
                  <Button variant='outlined' color='primary' style={{ padding: '5px 98px' }}>
                    Log Out
                  </Button>
                </Link>
              </Grid>
            </>
          )}
        </Paper>
      </Popover>
    </div>
  )
}
