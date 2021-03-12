import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    width: '85px',
    height: '95px',
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

export default function FriendCard({ friend }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction='column' spacing={1} alignItems='center'>
          <Grid item>
            <Avatar
              src={friend.profile_img}
              style={{ margin: 'auto', marginBottom: '0px' }}
              className={classes.image}
            />
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
    </div>
  )
}
