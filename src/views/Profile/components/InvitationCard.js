import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addWatchParty, fetchRemoveInv } from '../../../redux/actions/user'
import { makeStyles } from '@material-ui/core/styles'
import { fromUnixTime, format } from 'date-fns'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
// import Button from "@material-ui/core/Button"
// import MoreVertIcon from "@material-ui/icons/MoreVert"
import DoneIcon from '@material-ui/icons/Done'
import NotInterestedIcon from '@material-ui/icons/NotInterested'

import { IconButton } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    width: '180px',
  },
  image: {
    width: 40,
    height: 40,
  },
}))

export default function InvitationCard({ invitation }) {
  const classes = useStyles()
  // const currentUserId = useSelector(state => state.user.currentUser.id)
  const dispatch = useDispatch()
  const currentUserId = useSelector(state => state.user.currentUser.id)

  const handleConfirm = () => {
    dispatch(fetchRemoveInv(invitation.id))

    const serverURL = process.env.REACT_APP_SERVER_URL
    const user_watchpartyURL = serverURL + 'user_watchparties/'
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_watchparty: {
          user_id: currentUserId,
          watchparty_id: invitation.watchparty_id,
        },
      }),
    }

    fetch(user_watchpartyURL, postRequest)
      .then(resp => resp.json())
      .then(data => dispatch(addWatchParty(data.watchparty)))
  }

  const removeInvitation = () => dispatch(fetchRemoveInv(invitation.id))

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container direction='column'>
          <Typography variant='subtitle1'>From: {invitation.sender}</Typography>
          <Typography variant='subtitle1'>Where: {invitation.location}</Typography>
          <Grid container style={{ marginTop: '10px' }}>
            <Avatar
              src={invitation.home_team_logo}
              style={{ margin: 'auto', marginBottom: '0px' }}
              className={classes.image}
            />
            <div style={{ marginTop: '10px', fontSize: '1em' }}>
              {format(fromUnixTime(invitation.timestamp), 'p')}
            </div>

            <Avatar
              src={invitation.away_team_logo}
              style={{ margin: 'auto', marginBottom: '0px' }}
              className={classes.image}
            />
          </Grid>

          <div style={{ margin: 'auto', marginTop: '15px', marginBottom: '10px' }}>
            {format(fromUnixTime(invitation.timestamp), 'PP')}
          </div>

          <Grid item style={{ margin: 'auto' }}>
            <Grid container>
              <Grid item>
                <IconButton onClick={handleConfirm}>
                  <DoneIcon style={{ color: '#2196f3', fontSize: '1.2em' }} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={removeInvitation}>
                  <NotInterestedIcon style={{ color: 'red', fontSize: '1.2em' }} />
                </IconButton>
              </Grid>
              <Grid item>
                {/* <IconButton onClick={() => console.log(invitation)}>
                  <MoreVertIcon style={{color: 'green', fontSize: '1.2em'}}/>
                </IconButton> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
