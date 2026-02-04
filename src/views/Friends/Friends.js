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

const serverURL = process.env.REACT_APP_SERVER_URL
const userURL = serverURL + '/users/'
const friendshipsURL = serverURL + '/friendships/'
const removeFriendshipURL = friendshipsURL + '/remove/'

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

const DUMMY_FRIENDS = [
  {
    id: 'd1',
    name: 'John Doe',
    username: 'johndoe',
    profile_img: 'https://i.pravatar.cc/150?u=johndoe',
    invitations: [],
    watchparties: [{}, {}, {}],
    friends: [
      { id: 'sub1', name: 'Jane', username: 'jane_d', profile_img: 'https://i.pravatar.cc/150?u=jane' },
      { id: 'sub2', name: 'Bob', username: 'bob_s', profile_img: 'https://i.pravatar.cc/150?u=bob' }
    ],
    user_leagues: [{}, {}],
  },
  {
    id: 'd2',
    name: 'Alice Smith',
    username: 'alice_s',
    profile_img: 'https://i.pravatar.cc/150?u=alice',
    invitations: [],
    watchparties: [{}],
    friends: [
      { id: 'sub3', name: 'Charlie', username: 'charlie_Brown', profile_img: 'https://i.pravatar.cc/150?u=charlie' }
    ],
    user_leagues: [{}, {}, {}, {}],
  },
  {
    id: 'd3',
    name: 'Michael Jordan',
    username: 'mj_23',
    profile_img: 'https://i.pravatar.cc/150?u=mj',
    invitations: [],
    watchparties: [{}, {}, {}, {}, {}],
    friends: [],
    user_leagues: [{}],
  },
  {
    id: 'd4',
    name: 'Serena Williams',
    username: 'serena_w',
    profile_img: 'https://i.pravatar.cc/150?u=serena',
    invitations: [],
    watchparties: [{}, {}],
    friends: [
      { id: 'sub4', name: 'Venus', username: 'venus_w', profile_img: 'https://i.pravatar.cc/150?u=venus' },
      { id: 'sub5', name: 'Coach', username: 'coach_x', profile_img: 'https://i.pravatar.cc/150?u=coach' }
    ],
    user_leagues: [{}, {}, {}],
  },
  {
    id: 'd5',
    name: 'Lionel Messi',
    username: 'leo_messi',
    profile_img: 'https://i.pravatar.cc/150?u=messi',
    invitations: [],
    watchparties: [{}, {}, {}, {}, {}, {}, {}],
    friends: [
      { id: 'sub6', name: 'Neymar', username: 'neymar_jr', profile_img: 'https://i.pravatar.cc/150?u=neymar' },
      { id: 'sub7', name: 'Suarez', username: 'luis_suarez', profile_img: 'https://i.pravatar.cc/150?u=suarez' }
    ],
    user_leagues: [{}, {}],
  }
]

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
    // If it's a dummy friend, just dispatch the action directly to update state (mocking backend success)
    if (typeof currentFriend.id === 'string' && currentFriend.id.startsWith('d')) {
      dispatch(addFriend(currentFriend))
      return
    }

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
        dispatch(addFriend(friend))
      })
  }

  const handleRemoveFriend = () => {
    // If it's a dummy friend, just dispatch the remove action directly
    // Use a safe check to see if we can just remove it or if it's permanent
    // For now, let's just allow the dispatch, but we need to make sure reducer handles it safely or we construct a payload it expects.
    // Actually, for dummy friends that are hardcoded, "removing" them won't remove them from the hardcoded list.
    if (typeof currentFriend.id === 'string' && currentFriend.id.startsWith('d')) {
      // Just clear current friend selection or something?
      // Since they are hardcoded, we can't really remove them from the list.
      alert("Cannot remove a permanent dummy friend.")
      return
    }

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
      .then(data => dispatch(removeFriend(currentFriend.id)))
  }

  const generateFriends = () => {
    const allFriends = [...currentUser.friends, ...DUMMY_FRIENDS].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
    return allFriends.map((friend, idx) => (
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
    // Filter through current user's friends instead of all users
    let filteredFriends = [...currentUser.friends, ...DUMMY_FRIENDS].filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (filteredFriends.length === 0) {
      return <div style={{ padding: '10px' }}>No Matches</div>
    }

    return filteredFriends.map((friend, idx) => (
      <div style={{ padding: '10px' }} onClick={() => fetchFriend(friend)} key={idx}>
        <ButtonBase>{friend.name}</ButtonBase>
      </div>
    ))
  }

  const fetchFriend = friend => {
    setSearchTerm('')

    if (typeof friend.id === 'string' && friend.id.startsWith('d')) {
      setCurrentFriend(friend)
      return
    }

    fetch(userURL + friend.id)
      .then(resp => resp.json())
      .then(data => {
        setCurrentFriend(data)
      })
  }

  const renderFriendFriends = () => {
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
                  Friends: {currentUser.friends.length + DUMMY_FRIENDS.length}
                </Typography>
                <Paper elevation='0'>
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
                  Search Friends
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
                    {currentUser.friends.find(friend => friend.id === currentFriend.id) || (typeof currentFriend.id === 'string' && currentFriend.id.startsWith('d')) ? (
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
