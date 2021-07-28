import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    height: 80,
  },
  img: {
    width: 40,
    maxHeight: 60,
  },
  imgFlag: {
    width: '23px',
    marginRight: '10px',
  },
  links: {
    textDecoration: 'none',
    color: 'inherit',
  },
}))

export default function LeagueCardSmall({ currentLeague }) {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item>
            <img className={classes.img} src={currentLeague.logo} alt='league logo' />
          </Grid>
          <Grid item container xs>
            <Grid item xs container direction='column' justify='center' spacing={2}>
              <Grid item>
                <Typography gutterBottom variant='subtitle1' noWrap>
                  {currentLeague.name}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {currentLeague.flag && (
                    <img className={classes.imgFlag} src={currentLeague.flag} alt='league logo' />
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
