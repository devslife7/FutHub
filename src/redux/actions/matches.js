import { format } from 'date-fns'
import { mockAPI } from '../../mockData'

export const setCurrentMatch = match => {
  return {
    type: 'SET_CURRENT_MATCH',
    payload: match,
  }
}
export const setDatePickerDate = date => {
  return {
    type: 'SET_DATEPICKER_DATE',
    payload: date,
  }
}
export const fetchMatches = () => {
  return (dispatch, getState) => {
    const datePickerDate = getState().matches.datePickerDate
    dispatch({ type: 'LOADING_MATCHES' })

    const dateString = format(datePickerDate, 'yyyy-MM-dd')

    mockAPI.getMatchesByDate(dateString)
      .then(matches => {
        dispatch({ type: 'SET_DISPLAY_MATCHES', payload: matches })
      })
  }
}
