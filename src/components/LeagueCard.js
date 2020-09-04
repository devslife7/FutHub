import React from 'react';
// import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { addFavoriteLeague, removeFavoriteLeague } from '../actions/leagues'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const leaguesURL = 'http://localhost:3000/leagues/'

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

function LeagueCard( {league, addFavoriteLeague, removeFavoriteLeague, favLeagues, loggedIn} ) {
  const classes = useStyles()
  // const [ favorite, setFavorite ] = useState(league.is_favorite)

  const handleFavourite = () => {
    const isFav = isFavorite()

    if (isFav){
      removeFavoriteLeague(league.id)
    }
    else {
      addFavoriteLeague(league)
    }

    const patchRequest = {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        league: {
          is_favorite: !isFav
        }
      })
    }
    console.log(patchRequest)
    fetch(leaguesURL + league.id, patchRequest)
      .then( resp => resp.json() )
      .then( data => console.log( data ) )
  }

  const isFavorite = () => {
    let filtered = favLeagues.filter( fav => fav.id === league.id)
    return filtered.length > 0
  }

  // const handleStandings = () => {
  //   history.push("/standings")
  // }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} src={league.logo} alt='league logo' />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {league.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  { league.flag && <img style={{width: '23px', marginRight: '10px'}} src={league.flag} alt='league logo'/> }
                  {league.country}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {league.league_type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Active: {league.is_current === 1 ? 'Yes' : 'No'}
                </Typography>
              </Grid>
              <Grid item>
                { league.standings === 1
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
                {/* <Button
                  onClick={ () => console.log(league.league_id)}
                  variant='outlined' 
                  color='primary'
                  >Standings
                </Button> */}
              </Grid>
            </Grid>
            <Grid item>
              { loggedIn
              ? <IconButton onClick={ () => handleFavourite() }>
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

const mapDispatchToProps = dispatch => {
  return {
    addFavoriteLeague: league => {
      dispatch(addFavoriteLeague(league))
    },
    removeFavoriteLeague: leagueId => {
      dispatch(removeFavoriteLeague(leagueId))
    }
  }
}

const mapStateToProps = state => {
  return {
    favLeagues: state.leagues.favorites,
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeagueCard)