export default (
  state = {
    all: [],
    display: [],
    favorites: [],
    searchTerm: '',
  },
  action
  ) => {
  const popular_league_ids = [530, 775, 294, 524, 754, 891, 525, 514]
  let idx

  switch (action.type) {

    case "SET_LEAGUES":
      const displayLeagues = action.leagues.filter( league =>  popular_league_ids.includes(league.league_id))
      const favLeagues = action.leagues.filter( league =>  league.is_favorite === true )
      return  {
        ...state,
        all: action.leagues,
        display: displayLeagues,
        favorites: favLeagues
      }

    case "ADD_TO_FAVORITES":
      return  {
        ...state,
        favorites: [...state.favorites, action.league]
      }

    case "REMOVE_FROM_FAVORITES":
      console.log('remove favorite league action: ', action)
      idx = state.favorites.findIndex( league => league.id === action.leagueId )

      return  {
        ...state,
        favorites: [...state.favorites.slice(0, idx), ...state.favorites.slice(idx + 1)]
      }

    case "DISPLAY_WORLD_LEAGUES":
      const worldLeagues = state.all.filter( league => league.country === "World")
      return  {
        ...state,
        display: worldLeagues,
        searchTerm: ''
      }
    
    case "DISPLAY_ALL_LEAGUES":
    return  {
      ...state,
      display: state.all,
      searchTerm: ''
    }
    
    case "DISPLAY_POPULAR_LEAGUES":
    const displayLeagues1 = state.all.filter( league =>  popular_league_ids.includes(league.league_id))
    return  {
      ...state, 
      display: displayLeagues1,
      searchTerm: ''
    }

    case "SEARCH_LEAGUE_TERM":
      return {
        ...state,
        searchTerm: action.searchTerm
      }

    default:
      return state
  }
}
