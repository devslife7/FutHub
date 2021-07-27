import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFriend, removeFriend } from '../../redux/actions/user'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import FriendCard from '../../components/FriendCard'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'

const serverURL = process.env.BACKEND_SERVER_URL
const userURL = serverURL + 'users/'
const friendshipsURL = serverURL + 'friendships/'
const removeFriendshipURL = friendshipsURL + 'remove/'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
  gridStyle: {
    marginTop: '20px',
    padding: '0px 0px',
  },
  title: {
    textAlign: 'center',
    margin: '10px 0px 0px 0px',
    color: '#4791db',
    fontSize: '28px',
  },
  outerPaper: {
    minHeight: '59vh',
    textAlign: 'center',
    padding: '5px',
  },
  tipographySpacing: {
    fontSize: '1em',
    marginTop: '10px',
  },
}))

const initialUser = {
  id: null,
  name: '',
  username: '',
  profile_img: null,
  invitations: [],
  watchparties: [],
  friends: [],
  user_leagues: [],
}

function Friends() {
  console.log('renders Friends')
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const [userList, setUserList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentFriend, setCurrentFriend] = useState(initialUser)

  useEffect(() => {
    fetch(userURL)
      .then(resp => resp.json())
      .then(users => {
        setUserList(users)
      })
  }, [currentUser.friends])

  const handleAddFriend = () => {
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        friend_id: currentFriend.id,
      }),
    }

    fetch(friendshipsURL, postRequest)
      .then(resp => resp.json())
      .then(friend => {
        console.log(friend)
        dispatch(addFriend(friend))
      })
  }

  const handleRemoveFriend = () => {
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        friendship: {
          user_id: currentUser.id,
          friend_id: currentFriend.id,
        },
      }),
    }
    fetch(removeFriendshipURL, postRequest)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        dispatch(removeFriend(currentFriend.id))
      })
  }

  const generateFriends = () => {
    return currentUser.friends.map((friend, idx) => (
      <ListItem key={idx} style={{ paddingLeft: '40px', marginRight: '0px' }}>
        <ListItemAvatar>
          <Avatar src={friend.profile_img} />
        </ListItemAvatar>
        <ListItemText primary={friend.name} secondary={friend.username} />
        <IconButton onClick={() => fetchFriend(friend)}>
          <ChevronRightIcon />
        </IconButton>
      </ListItem>
    ))
  }

  const renderUsersList = () => {
    const userNames = userList.map(friend => {
      return {
        name: friend.name,
        id: friend.id,
      }
    })
    let filteredUserNames = userNames.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (filteredUserNames.length === 0) {
      return <div style={{ padding: '10px' }}>No Matches</div>
    }

    return filteredUserNames.map((friend, idx) => (
      <div style={{ padding: '10px' }} onClick={() => fetchFriend(friend)} key={idx}>
        <ButtonBase>{friend.name}</ButtonBase>
      </div>
    ))
  }

  const fetchFriend = friend => {
    setSearchTerm('')

    fetch(userURL + friend.id)
      .then(resp => resp.json())
      .then(data => {
        setCurrentFriend(data)
      })
  }

  const renderFriendFriends = () => {
    console.log('FRIEND: ', currentFriend)
    return currentFriend.friends.map((f, idx) => (
      <Grid key={idx} item xs={2}>
        <FriendCard friend={f} />
      </Grid>
    ))
  }

  return (
    <>
      <Grid
        container
        justify='space-evenly'
        alignItems='flex-start'
        spacing={3}
        className={classes.gridStyle}
      >
        <Grid item xs={3}>
          <Paper elevation={6} className={classes.outerPaper}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ maxWidth: '100%', flexBasis: '100%' }}>
                <Typography variant='h5' className={classes.title} style={{ margin: '30px 0px 15px 0px' }}>
                  Friends: {currentUser.friends.length}
                </Typography>
                <Paper>
                  <List style={{ height: '50vh', overflow: 'auto' }}>{generateFriends()}</List>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={5} className={classes.outerPaper}>
            <Grid container spacing={5} justify='center' style={{ marginTop: '0px' }}>
              <Grid item xs={4}>
                <Typography variant='h5' className={classes.title}>
                  Search Users
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  id='outlined-basic'
                  label='Search...'
                  variant='outlined'
                  style={{ width: '220px' }}
                />
                {searchTerm.length >= 2 ? (
                  <Paper style={{ position: 'absolute', marginLeft: '7vh', padding: '10px 20px 10px 20px' }}>
                    {renderUsersList()}
                  </Paper>
                ) : null}
              </Grid>
            </Grid>
            {currentFriend.id ? (
              <>
                <Grid container justify='center' style={{ margin: '50px 0px' }}>
                  <Grid
                    item
                    xs={3}
                    // style={{backgroundColor: 'red'}}
                  >
                    <Avatar
                      src={currentFriend.profile_img}
                      style={{ margin: 'auto' }}
                      className={classes.large}
                    />
                    {currentUser.friends.find(friend => friend.id === currentFriend.id) ? (
                      <Button
                        variant='outlined'
                        color='primary'
                        style={{ marginTop: '10px' }}
                        onClick={handleRemoveFriend}
                      >
                        Remove friend
                      </Button>
                    ) : (
                      <Button
                        variant='outlined'
                        color='primary'
                        style={{ marginTop: '10px' }}
                        onClick={handleAddFriend}
                      >
                        Add friend
                      </Button>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    // style={{backgroundColor: 'yellow'}}
                  >
                    <Typography variant='h1' gutterBottom style={{ fontSize: '1.2em', marginTop: '20px' }}>
                      {currentFriend.name}
                    </Typography>
                    <Typography variant='h1' gutterBottom style={{ fontSize: '1.2em', margin: '20px 0px' }}>
                      {currentFriend.username}
                    </Typography>
                    <Typography color='textSecondary' gutterBottom className={classes.tipographySpacing}>
                      Attending Parties: {currentFriend.watchparties.length}
                    </Typography>
                    <Typography color='textSecondary' gutterBottom className={classes.tipographySpacing}>
                      Friends: {currentFriend.friends.length}
                    </Typography>
                    <Typography color='textSecondary' gutterBottom className={classes.tipographySpacing}>
                      Favorite Leagues: {currentFriend.user_leagues.length}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Typography
                    variant='h1'
                    gutterBottom
                    style={{ fontSize: '1.2em', marginTop: '0px', marginLeft: '40px' }}
                  >
                    Friends:
                  </Typography>
                  <Grid container spacing={2} style={{ marginLeft: '35px' }}>
                    {renderFriendFriends()}
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography color='textSecondary' gutterBottom style={{ fontSize: '1em', marginTop: '20vh' }}>
                Select a user to see more info...
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Friends
