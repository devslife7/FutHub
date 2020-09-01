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
