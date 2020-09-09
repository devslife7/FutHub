import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MatchCard from './MatchCard'
// import DatePickerMatches from './DatePickerMatches'
import { fetchMatches, setDatePickerDate } from '../actions/matches'
import DatePicker from './DatePicker'
import MatchInfo from './MatchInfo'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '3em',
    margin: '40px 0px'
  },
  paper: {
    minHeight: '70vh',
    // height: '74vh',
  },
  divider: {
    width: '50vh',
  }
}))

function Upcoming() {
  console.log('renders Upcoming')
  const classes = useStyles()
  const dispatch = useDispatch()
  const displayMatches = useSelector(state => state.matches.display)
  const datePickerDate = useSelector(state => state.matches.datePickerDate)
  const loading = useSelector(state => state.matches.loading)

  useEffect( () => {
    dispatch(fetchMatches())

  }, [datePickerDate, dispatch])

  const renderMatches = () => {
    return displayMatches.map( (match, idx) => 
        <Grid key={idx} item>
          <MatchCard match={match}/>
          <Divider className={classes.divider}/>
        </Grid>
    )
  }

  const setDateFromDatePicker = date => {
    dispatch(setDatePickerDate(date))
  }

  return (
    <>
      <Typography variant="h2" align="center" color="textPrimary" className={classes.title}>
        Upcoming Matches
      </Typography>
      <Grid container spacing={1} alignItems="flex-start" justify="flex-start">
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Grid container justify='center' alignItems='center'>
              <Grid item style={{margin: '15px 0px'}} >
                <DatePicker setDateFromDatePicker={setDateFromDatePicker} datePickerDate={datePickerDate}/>
              </Grid>
                { loading ?
                  <Typography variant="h1" style={{fontSize: '1.3em', marginTop: '60px'}} >
                    Loading...
                  </Typography>
                :
                  <Paper style={{ height: '65vh', overflow: 'auto'}}>
                    {renderMatches()}
                  </Paper>
                }
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper style={{ height: '64vh'}}>
            <Grid container spacing={2} justify='center' alignItems='center'>
              <MatchInfo/>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Upcoming
