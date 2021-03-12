import React from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { setCurrentMatch } from '../../../actions/matches'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
// import Divider from '@material-ui/core/Divider';

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
}))

function MatchCard({ match }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleCurrentMatch = () => {
    dispatch(setCurrentMatch(match))
  }

  return (
    <ListItem button onClick={handleCurrentMatch}>
      <Grid container justify='center' style={{ height: '30px', padding: '0px 0px 0px 0px' }}>
        <Grid
          item
          xs={5}
          // style={{ backgroundColor: 'yenllow '}}
        >
          <Grid container alignItems='center' justify='flex-end'>
            <span className={`${classes.margin} ${classes.fontSize}`}>{match.homeTeam.team_name}</span>
            <Avatar src={match.homeTeam.logo} className={`${classes.margin} ${classes.logoSize}`} />
          </Grid>
        </Grid>
        <Grid
          item
          xs={1}
          // style={{ backgroundColor: 'pink'}}
        >
          <Grid container direction='column' alignItems='center'>
            {match.statusShort === 'NS' ? (
              <Moment style={{ marginTop: '5px', fontSize: '0.9em' }} unix format='HH:mm'>
                {match.event_timestamp}
              </Moment>
            ) : (
              <>
                <span className={classes.fontSize}>
                  {match.goalsHomeTeam} - {match.goalsAwayTeam}
                </span>
                <span style={{ fontSize: '0.7em' }}>{match.statusShort}</span>
              </>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          // style={{ backgroundColor: 'green '}}
        >
          <Grid container alignItems='center' direction='row'>
            <Grid item>
              <Avatar src={match.awayTeam.logo} className={`${classes.margin} ${classes.logoSize}`} />
            </Grid>
            <Grid item>
              <p className={`${classes.margin} ${classes.fontSize}`}>{match.awayTeam.team_name}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default MatchCard
