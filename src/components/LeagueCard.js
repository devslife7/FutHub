import React from 'react';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
// import StarOutlineIcon from '@material-ui/icons/StarOutline';
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
}));

export default function LeagueCard( {league} ) {
  const classes = useStyles()
  const [ favorite, setFavorite ] = useState(false)


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
                  Season Ends: {league.season_end}
                </Typography>
              </Grid>
              <Grid item>
                { league.standings === 1
                ? <Button
                    onClick={ () => console.log(league.league_id)}
                    variant='outlined' 
                    color='primary'
                    >Standings
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
              <IconButton onClick={ () => setFavorite(!favorite) }>
              { favorite ? <StarIcon color='primary' /> : <StarBorderIcon/> }
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}