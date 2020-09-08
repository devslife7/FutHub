import React from 'react';
import { useDispatch } from 'react-redux';
// import { addFavoriteLeague, removeFavoriteLeague } from '../actions/user';
import { removeWatchParty } from '../actions/user'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const watchPartyURL = 'http://localhost:3000/watchparties/'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    width: '180px',
    height: '100px'
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

function WatchPartyCard({ party }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleDelete = () => {
    fetch(watchPartyURL + party.id, { method: 'DELETE' })
      .then(resp => resp.json() )
      .then( data => {
        console.log(data)
        dispatch(removeWatchParty(party.id))
      })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant="h1" gutterBottom style={{fontSize: '1em'}} >
              {party.name}
            </Typography>
          </Grid>
          <Grid item style={{margin: 'auto'}}>
            <Typography variant="subtitle1">
              {'date here'}
            </Typography>
            <Typography variant="body2">
              {'edit here'}
            </Typography>
            <Button variant='contained' color='secondary' onClick={handleDelete}>Delete</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default WatchPartyCard