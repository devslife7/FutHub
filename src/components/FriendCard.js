import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    width: '85px',
  },
  img: {
    width: 40,
    height: 40,
  },
}))

export default function FriendCard({ friend }) {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container direction='column' spacing={1} alignItems='center'>
          <Grid item>
            <Avatar src={friend.profile_img} />
          </Grid>
          <Grid item>
            <Grid container direction='column' alignItems='center'>
              <Grid item>
                <Typography variant='subtitle1'>{friend.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2'>{friend.username}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
