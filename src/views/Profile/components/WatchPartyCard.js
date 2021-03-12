import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { replaceWatchParty } from '../../../actions/user'
import Moment from 'react-moment'
// import { addFavoriteLeague, removeFavoriteLeague } from '../actions/user';
import { removeWatchParty } from '../../../actions/user'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
// import MoreVertIcon from "@material-ui/icons/MoreVert"
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
// import FormControl from '@material-ui/core/FormControl'
// import InputLabel from "@material-ui/core/InputLabel"
import Button from '@material-ui/core/Button'

const serverURL = process.env.REACT_APP_SERVER_URL
const watchPartyURL = serverURL + 'watchparties/'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    width: '180px',
    height: '200px',
  },
  image: {
    width: 40,
    height: 40,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))

export default function WatchPartyCard({ party }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newLocation, setNewLocation] = useState('')

  const handleClickOpen = () => {
    setNewName(party.name)
    setNewTime(party.time)
    setNewLocation(party.location)

    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleDelete = () => {
    fetch(watchPartyURL + party.id, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        dispatch(removeWatchParty(party.id))
      })
  }
  const handleEditSubmit = () => {
    handleClose()

    const serverURL = process.env.REACT_APP_SERVER_URL
    const watchpartyURL = serverURL + 'watchparties/'

    const patchRequest = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        watchparty: {
          name: newName,
          time: newTime,
          location: newLocation,
        },
      }),
    }

    fetch(watchpartyURL + party.id, patchRequest)
      .then(resp => resp.json())
      .then(data => dispatch(replaceWatchParty(data)))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='h1' gutterBottom style={{ fontSize: '1em' }}>
              {party.name}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container style={{ marginTop: '10px' }}>
              <Avatar
                variant='square'
                src={party.home_team_logo}
                style={{ margin: 'auto', marginBottom: '0px' }}
                className={classes.image}
              />
              <Typography variant='subtitle1'>{party.time}</Typography>

              <Avatar
                variant='square'
                src={party.away_team_logo}
                style={{ margin: 'auto', marginBottom: '0px' }}
                className={classes.image}
              />
            </Grid>
          </Grid>
          <Grid item style={{ margin: 'auto' }}>
            <Typography variant='subtitle1'>
              <Moment style={{ marginLeft: '40px' }} interval={0} format='MMM D, YYYY' unix>
                {party.timestamp}
              </Moment>
            </Typography>
            <Typography variant='subtitle1'>Where: {party.location}</Typography>

            <Grid container justify='center' alignItems='center'>
              {currentUser.name === party.creator_name && (
                <Grid item>
                  <IconButton onClick={handleClickOpen}>
                    <EditIcon color='primary' />
                  </IconButton>
                </Grid>
              )}
              <Grid item>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color='error' />
                </IconButton>
              </Grid>
              {/* <IconButton onClick={() => console.log(party)}>
                <MoreVertIcon style={{color: 'green'}}/>
              </IconButton> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle style={{ color: '#2196f3' }}>Edit Watch Party</DialogTitle>
        <DialogContent>
          <form className={classes.container} style={{ width: '250px' }}>
            <TextField
              margin='normal'
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <TextField
              margin='normal'
              fullWidth
              id='time'
              label='Time'
              name='time'
              autoComplete='time'
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
            />
            <TextField
              margin='normal'
              fullWidth
              id='location'
              label='Location'
              name='location'
              autoComplete='location'
              value={newLocation}
              onChange={e => setNewLocation(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button color='primary' onClick={handleEditSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
