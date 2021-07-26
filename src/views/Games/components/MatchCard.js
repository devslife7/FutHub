import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentMatch } from '../../../redux/actions/matches'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import { fromUnixTime, format } from 'date-fns'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: '0px 6px',
  },
  logoSize: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  fontSize: {
    fontSize: '0.9em',
  },
  matchTime: {
    marginTop: '5px',
    fontSize: '0.9em',
  },
}))

export default function MatchCard({ match }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleCurrentMatch = () => {
    dispatch(setCurrentMatch(match))
  }

  return (
    <ListItem button onClick={handleCurrentMatch}>
      <Grid container justify='center' style={{ height: '30px', padding: '0px' }}>
        <Grid item xs={5}>
          <Grid container alignItems='center' justify='flex-end'>
            <span className={`${classes.margin} ${classes.fontSize}`}>{match.teams.home.name}</span>
            <Avatar src={match.teams.home.logo} className={`${classes.margin} ${classes.logoSize}`} />
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction='column' alignItems='center'>
            {match.fixture.status.short === 'NS' ? (
              <div className={classes.matchTime}>
                {format(fromUnixTime(match.fixture.timestamp), 'HH:mm')}
              </div>
            ) : (
              <>
                <span className={classes.fontSize}>
                  {match.goals.home} - {match.goals.away}
                </span>
                <span style={{ fontSize: '0.7em' }}>{match.fixture.status.short}</span>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container alignItems='center' direction='row'>
            <Grid item>
              <Avatar src={match.teams.away.logo} className={`${classes.margin} ${classes.logoSize}`} />
            </Grid>
            <Grid item>
              <p className={`${classes.margin} ${classes.fontSize}`}>{match.teams.away.name}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  )
}
