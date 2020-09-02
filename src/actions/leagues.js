export const setLeagues = (leagues) => {
  return {
    type: "SET_LEAGUES",
    leagues
  }
}

export const displayWorldLeagues = () => {
  return {
    type: "DISPLAY_WORLD_LEAGUES"
  }
}

export const displayAllLeagues = () => {
  return {
    type: "DISPLAY_ALL_LEAGUES"
  }
}

export const displayPopularLeagues = () => {
  return {
    type: "DISPLAY_POPULAR_LEAGUES"
  }
}

export const searchLeagueTerm = (searchTerm) => {
  return {
    type: "SEARCH_LEAGUE_TERM",
    searchTerm
  }
}

export const addFavoriteLeague = (league) => {
  return {
    type: "ADD_TO_FAVORITES",
    league
  }
}
export const removeFavoriteLeague = (leagueId) => {
  return {
    type: "REMOVE_FROM_FAVORITES",
    leagueId
  }
}
