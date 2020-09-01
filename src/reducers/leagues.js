export default (state = {}, action) => {
  const popular_league_ids = [530, 775, 294, 524, 754, 891, 514, 525]

  switch (action.type) {

    case "SET_LEAGUES":
      const displayLeagues = action.leagues.filter( league =>  popular_league_ids.includes(league.league_id))
      return  {
        ...state,
        all: action.leagues,
        display: displayLeagues
      }

    case "DISPLAY_WORLD_LEAGUES":
      const worldLeagues = state.all.filter( league => league.country === "World")
      return  {...state, display: worldLeagues }
    
    case "DISPLAY_ALL_LEAGUES":
    return  {...state, display: state.all }
    
    case "DISPLAY_POPULAR_LEAGUES":
    const displayLeagues1 = state.all.filter( league =>  popular_league_ids.includes(league.league_id))
    return  {...state, display: displayLeagues1 }

    case "SEARCH_LEAGUE_TERM":
      // const searchedLeagues = state.display.filter( league => league.name.includes(action.term) )
      return {...state, searchTerm: action.searchTerm}

    default:
      return state
  }
}
