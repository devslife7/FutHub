export default (
  state = {
    favLeagues: []
  },
  action
  ) => {

  switch (action.type) {

    case "ADD_TO_FAVORITES":
      return  {
        ...state,
        favLeagues: [...state.favLeagues, action.league]
      }

    default:
      return state
  }
}
