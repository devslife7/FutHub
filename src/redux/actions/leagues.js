import { mockAPI } from '../../mockData'

export const fetchPopularLeagues = () => {
  return dispatch => {
    dispatch({ type: 'LOADING_LEAGUES' })

    mockAPI.getPopularLeagues()
      .then(popularLeagues => {
        dispatch({ type: 'ADD_DISPLAY_LEAGUES', payload: popularLeagues })
      })
  }
}

export const fetchInternationalLeagues = () => {
  return dispatch => {
    dispatch({ type: 'LOADING_LEAGUES' })

    mockAPI.getPopularLeagues()
      .then(internationalLeagues => {
        dispatch({ type: 'ADD_DISPLAY_LEAGUES', payload: internationalLeagues })
      })
  }
}
export const fetchAllLeagues = () => {
  return dispatch => {
    dispatch({ type: 'LOADING_LEAGUES' })

    mockAPI.getPopularLeagues()
      .then(allLeagues => {
        dispatch({ type: 'ADD_DISPLAY_LEAGUES', payload: allLeagues })
      })
  }
}

export const setSearchTermLeagues = searchTerm => {
  return {
    type: 'SET_SEARCH_TERM_LEAGUE',
    payload: searchTerm,
  }
}
