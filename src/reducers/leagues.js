const initialState = {
  display: [],
  searchTerm: '',
  loading: false
}
export default (state = initialState, action) => {
  console.log(action)

  switch (action.type) {
    case "LOADING_LEAGUES":
      return {
        ...state,
        loading: true
      }

    case "ADD_DISPLAY_LEAGUES":
      return {
        ...state,
        display: action.payload,
        loading: false
      }

    case "SET_SEARCH_TERM_LEAGUE":
    return {
      ...state,
      searchTerm: action.payload
    }
    
    default:
      return state
  }
}
