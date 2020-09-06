import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
// import CircularProgress from '@material-ui/core/CircularProgress';

const baseURL = 'http://localhost:3000/'
const userURL = baseURL + 'users/'
const friendshipsURL = baseURL + 'friendships/'
const removeFriendshipURL = friendshipsURL + 'remove/'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    },
  gridStyle: {
    marginTop: '50px',
    // backgroundColor: '#EAEAEA',
    // borderRadius: '20px',
    padding: '0px 0px'
  },
  title: {
    textAlign: 'center',
    margin: '10px 0px 0px 0px',
    color: '#4791db',
    fontSize: "28px"
  },
  outerPaper: {
    height: '800px',
    textAlign: 'center',
    padding: '5px'
  }
}))

function Friends({ currentUser }) {
  console.log('renders Friends')
  const classes = useStyles()
  const [ userList, setUserList ] = useState([])
  const [ friendList, setFriendList ] = useState(currentUser.friends)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ friendSearchTerm, setFriendSearchTerm ] = useState('')
  const [ loading, setLoading ] = useState(false)

  useEffect( () => {
    setLoading(true)
    fetch(userURL)
      .then( resp => resp.json() )
      .then( data => {
        setUserList( data )
        setLoading(false)
        setFriendList( currentUser.friends )
      })

  }, [currentUser.friends])

  const handleAddFriend = friendId => {
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        friend_id: friendId
      })
    }
  
    fetch(friendshipsURL, postRequest)
      .then( resp => resp.json() )
      .then( () => {
        const friendObj = userList.filter( user => user.id === friendId )[0]
        setFriendList( [...friendList, friendObj] )
      })
  }

  const handleRemoveFriend = friendId => {
    console.log('this is freind IDIDID: ', friendId)
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        friendship: {
          user_id: currentUser.id,
          friend_id: friendId
        }
      })
    }
    fetch(removeFriendshipURL, postRequest)
      .then( resp => resp.json() )
      .then( () => {
        const friendObj = userList.filter( user => user.id === friendId )[0]
        const friendIndex = friendList.findIndex( f => f === friendObj )

        setFriendList( [...friendList.slice(0, friendIndex), ...friendList.slice(friendIndex + 1)] )
      })
  }

  const generateFriends = () => {
    console.log('generateFriends runs')

    let filteredFriendList = friendList.filter(user => user.name.toLowerCase().includes(friendSearchTerm.toLowerCase()))
    console.log('this is friendsList', friendList)
  
    return filteredFriendList.map( ( friend, idx ) =>
      <ListItem key={idx} style={{ paddingLeft: '40px', marginRight: '0px'}}>
        {/* <ListItemAvatar>
          <Avatar src="/broken-image.jpg"/>
        </ListItemAvatar> */}
        <ListItemText
          primary={ friend.name }
          secondary= { friend.username }
        />
        <ListItemSecondaryAction style={{ paddingRight: '0px'}}>
          <IconButton edge="end" aria-label="delete" onClick={ () => handleRemoveFriend(friend.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>,
    )
  }

  const generateUsers = userList => {
    const friendIds = currentUser.friends.map( user => user.id )

    userList = userList.filter( user => user.id !== currentUser.id )
    userList = userList.filter( user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) )
  
    return userList.map( ( user, idx) => 
      <ListItem style={{ paddingLeft: '40px'}} key={idx}>
        {/* <ListItemAvatar>
          <Avatar src="/broken-image.jpg"/>
        </ListItemAvatar> */}
        <ListItemText
          primary= { user.name }
          secondary= { user.username }
        />
        { !friendIds.includes( user.id ) ?
        <IconButton edge="end" aria-label="delete" onClick={ (e) => handleAddFriend( user.id )} style={{marginRight: '50px'}}>
          <GroupAddIcon color='primary' />
        </IconButton>
        : <PersonAddDisabledIcon color='disabled' style={{marginRight: '60px'}}/>
        }
      </ListItem>,
    )
  }

  
  return (
    <>
      <Grid container justify='space-evenly' alignItems='center' spacing={3} className={classes.gridStyle}>
        <Grid item xs={3} style={{ marginBotton: '300px'}}>
          <Paper elevation={6} className={classes.outerPaper}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ maxWidth: '100%', flexBasis: '100%'}}>
                <Typography variant="h5" className={classes.title}>
                  Friends
                </Typography>
                <div style={{ display: 'flex', justify: 'center'}}>
                  <TextField
                    onChange={ e => setFriendSearchTerm(e.target.value) }
                    label="Search Friends..."
                    style={{ margin: '0px 20px 10px 40px'}}
                  />
                </div>  
                <Paper>
                  <List style={{ height: '680px', overflow: 'auto'}}>
                    { generateFriends() }
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={5} className={classes.outerPaper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{ maxWidth: '100%', flexBasis: '100%'}}>
              <Typography variant="h5" className={classes.title}>
                All Users
              </Typography>
              <div style={{ display: 'flex', justify: 'center'}}>
                <TextField
                  onChange={ e => setSearchTerm(e.target.value) }
                  label="Search Users..."
                  style={{ margin: '0px 20px 10px 40px'}}
                />
              </div>  
              <Paper>
                <List style={{ height: '680px', overflow: 'auto'}} >
                  {/* { loading && <CircularProgress style={{marginTop: '50px'}} /> } */}
                  { loading
                  ? <div>Loading...</div>
                  : generateUsers(userList) }
                </List>
              </Paper>
            </Grid>
          </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  }
}

export default connect(mapStateToProps)(Friends)