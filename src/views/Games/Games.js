import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMatches, setDatePickerDate } from '../../redux/actions/matches'
import { makeStyles } from '@material-ui/core/styles'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'

import { MatchCard, MatchInfo } from './components'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '65vh',
  },
  divider: {
    width: '50vh',
  },
  title: {
    textAlign: 'center',
    paddingTop: '20px',
    fontWeight: 400,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
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
    dispatch(setDatePickerDate(date))
  }

  return (
    <>
      <Grid container spacing={2} alignItems='center' justify='center' style={{ marginTop: '10px' }}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2 className={classes.title}>Matches</h2>
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
                    label='Choose Date'
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
                <>
                  {displayMatches.length === 0 ? (
                    <Typography variant='h1' style={{ fontSize: '1.4em', marginTop: '90px' }}>
                      No Matches found for this date
                    </Typography>
                  ) : (
                    <Paper style={{ height: '50vh', width: '100%', overflow: 'auto' }}>
                      {renderMatches()}
                    </Paper>
                  )}
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ minHeight: '65vh' }}>
            <h2 className={classes.title}>More Info</h2>
            <Grid container spacing={2} justify='center' alignItems='center'>
              <MatchInfo />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
