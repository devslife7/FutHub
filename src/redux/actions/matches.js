import { format } from 'date-fns'
const serverURL = process.env.BACKEND_SERVER_URL
const matchesURL = serverURL + 'fixtures/date/'

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

    const postRequest = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        fetchDate: format(datePickerDate, 'yyyy-MM-dd'),
      }),
    }

    fetch(matchesURL, postRequest)
      .then(resp => resp.json())
      .then(matches => {
        dispatch({ type: 'SET_DISPLAY_MATCHES', payload: matches })
      })
  }
}
