import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMatches, setDatePickerDate } from '../../actions/matches'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'

import { MatchCard, MatchInfo } from './components'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3em',
    margin: '40px 0px',
  },
  paper: {
    minHeight: '65vh',
  },
  divider: {
    width: '50vh',
  },
}))

export default function Games() {
  console.log('renders Upcoming')
  const classes = useStyles()
  const dispatch = useDispatch()
  const displayMatches = useSelector(state => state.matches.display)
  const datePickerDate = useSelector(state => state.matches.datePickerDate)
  const loading = useSelector(state => state.matches.loading)

  useEffect(() => {
    dispatch(fetchMatches())
  }, [datePickerDate, dispatch])

  const renderMatches = () => {
    return displayMatches.map((match, idx) => (
      <Grid key={idx} item>
        <MatchCard match={match} />
        <Divider className={classes.divider} />
      </Grid>
    ))
  }

  const setDateFromDatePicker = date => {
    dispatch(setDatePickerDate(format(date, 'yyyy-MM-dd')))
  }

  return (
    <>
      <Grid container spacing={2} alignItems='center' justify='center' style={{ marginTop: '10px' }}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2 style={{ textAlign: 'center', paddingTop: '20px', fontWeight: 400 }}>Matches</h2>
            <Grid container justify='center' alignItems='center' direction='column'>
              <Grid item style={{ margin: '15px 0px' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Date picker inline'
                    value={datePickerDate}
                    onChange={setDateFromDatePicker}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              {loading ? (
                <Grid item>
                  <Typography variant='h1' style={{ fontSize: '1.3em', marginTop: '90px' }}>
                    Loading...
                  </Typography>
                </Grid>
              ) : (
                <Paper style={{ height: '50vh', overflow: 'auto' }}>{renderMatches()}</Paper>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ minHeight: '65vh' }}>
            <h2 style={{ textAlign: 'center', paddingTop: '20px', fontWeight: 400 }}>More Info</h2>
            <Grid container spacing={2} justify='center' alignItems='center'>
              <MatchInfo />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
