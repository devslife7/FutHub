const popularLeaguesURL = "http://localhost:3000/leagues/popular"
const internationalLeaguesURL = "http://localhost:3000/leagues/international"
const allLeaguesURL = "http://localhost:3000/leagues"

export const fetchPopularLeagues = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING_LEAGUES" })

    fetch(popularLeaguesURL)
      .then( resp => resp.json() )
      .then( popularLeagues => {
        dispatch({ type: "ADD_DISPLAY_LEAGUES", payload: popularLeagues })
      })
  }
}

export const fetchInternationalLeagues = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING_LEAGUES" })

    fetch(internationalLeaguesURL)
      .then( resp => resp.json() )
      .then( internationalLeagues => {
        dispatch({ type: "ADD_DISPLAY_LEAGUES", payload: internationalLeagues })
      })
  }
}
export const fetchAllLeagues = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING_LEAGUES" })

    fetch(allLeaguesURL)
      .then( resp => resp.json() )
      .then( allLeagues => {
        dispatch({ type: "ADD_DISPLAY_LEAGUES", payload: allLeagues })
      })
  }
}

export const setSearchTermLeagues = searchTerm => {
  return {
    type: "SET_SEARCH_TERM_LEAGUE",
    payload: searchTerm
  }
}