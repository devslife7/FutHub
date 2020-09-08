import React from 'react';
// import { useSelector } from 'react-redux';
// import { addFavoriteLeague, removeFavoriteLeague } from '../actions/user';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    width: '85px',
    height: '90px'
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
}));

function FriendCard({ friend }) {
  const classes = useStyles()
  // const currentUserId = useSelector(state => state.user.currentUser.id)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction='column'>
          <Grid item>
            <Avatar src="/broken-image.jpg" style={{margin: 'auto', marginBottom: '0px'}}
              className={classes.image}
            />
          </Grid>
          <Grid item style={{margin: 'auto'}}>
            <Typography variant="subtitle1">
              {friend.name}
            </Typography>
            <Typography variant="body2">
              {friend.username}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default FriendCard