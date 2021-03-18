import React from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { addFavoriteLeague, removeFavoriteLeague } from '../actions/user';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
  },
  img: {
    width: 40,
    height: 40,
  },
  links: {
    textDecoration: 'none',
    color: 'inherit',
  },
}))

function LeagueCardSmall({ currentLeague }) {
  const classes = useStyles()
  // const dispatch = useDispatch()
  // const currentUserId = useSelector(state => state.user.currentUser.id)
  // const favLeagues = useSelector(state => state.user.currentUser.favLeagues)

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item style={{ backgroundColor: 'red' }}>
            <img className={classes.img} src={currentLeague.logo} alt='league logo' />
          </Grid>
          <Grid item xs={12} container style={{ backgroundColor: 'red' }}>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1'>
                  {currentLeague.name}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {currentLeague.flag && (
                    <img
                      style={{ width: '23px', marginRight: '10px' }}
                      src={currentLeague.flag}
                      alt='league logo'
                    />
                  )}
                  {currentLeague.country === 'World' ? 'International' : currentLeague.country}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default LeagueCardSmall
