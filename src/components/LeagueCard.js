import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFavoriteLeague, removeFavoriteLeague } from '../actions/user';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // margin: 'auto',
    maxWidth: 400,
    height: '320px'
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  links: {
    textDecoration: 'none',
    color: 'inherit',
  }
}));

function LeagueCard({ currentLeague }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUserId = useSelector(state => state.user.currentUser.id)
  const favLeagues = useSelector(state => state.user.currentUser.favLeagues)
  const loggedIn = useSelector(state => state.user.loggedIn)

  const handleFavourite = () => {
    console.log("USERrelationship: ", currentLeague)
    !isFavorite() ?
    dispatch(addFavoriteLeague(currentLeague, currentUserId)) :
    dispatch(removeFavoriteLeague(currentLeague.userRelationshipId))
  }

  const isFavorite = () => favLeagues.find(league => league.id === currentLeague.id)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} src={currentLeague.logo} alt='league logo' />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {currentLeague.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  { currentLeague.flag && <img style={{width: '23px', marginRight: '10px'}} src={currentLeague.flag} alt='league logo'/> }
                  {currentLeague.country === "World" ? "International" : currentLeague.country}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {currentLeague.league_type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Active: {currentLeague.is_current === 1 ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  leagueId: {currentLeague.id}
                </Typography>
              </Grid>
              <Grid item>
                { currentLeague.standings === 1
                ? <Button
                    // onClick={ () => handleStandings() }
                    variant='outlined'
                    color='primary'
                    >
                      <Link to="/standings" className={classes.links}>
                        Standings
                      </Link>
                  </Button>
                : <Button
                    variant='outlined' 
                    color='primary'
                    disabled
                    >Standings
                  </Button>
                }
              </Grid>
            </Grid>
            <Grid item>
              { loggedIn
              ? <IconButton onClick={ handleFavourite }>
                  { isFavorite() ? <StarIcon color='primary' /> : <StarBorderIcon/> }
                </IconButton>
              : null
              }
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default LeagueCard