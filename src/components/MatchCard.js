import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentMatch } from '../actions/matches'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: '0px 6px'
  },
  logoSize: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  fontSize: {
    fontSize: '0.9em'
  },
}))

function MatchCard({ match }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleCurrentMatch = () => {
    console.log("enters function to handle match")
    dispatch(setCurrentMatch(match))
  }

  return (
    <ListItem button onClick={handleCurrentMatch}>
      <Grid container justify='center' style={{height: '25px'}}>
        <Grid item xs={5}
          // style={{ backgroundColor: 'yellow '}}
        >
          <Grid container alignItems='center' justify='flex-end' >
            <span className={`${classes.margin} ${classes.fontSize}`} >{match.homeTeam.team_name}</span>
            <Avatar src={match.homeTeam.logo} className={`${classes.margin} ${classes.logoSize}`}/>
          </Grid>
        </Grid>
        <Grid item xs={1}
          // style={{ backgroundColor: 'pink'}}
        >
          <Grid container direction='column' alignItems='center' >
            <span className={classes.fontSize} >{match.goalsHomeTeam} - {match.goalsAwayTeam}</span>
            <span style={{fontSize: '0.7em'}}>{match.statusShort}</span>
          </Grid>
        </Grid>
        <Grid item xs={5}
          // style={{ backgroundColor: 'green '}}
        >
          <Grid container alignItems='center' >
            <Avatar src={match.awayTeam.logo} className={`${classes.margin} ${classes.logoSize}`}/>
            <span className={`${classes.margin} ${classes.fontSize}`} >{match.awayTeam.team_name }</span>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default MatchCard
