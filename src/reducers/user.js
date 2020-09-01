export default (
  state = {
    newUser: {},
    currentUser: {}
  },
  action
  ) => {

  switch (action.type) {

    case "SET_LEAGUES":
      return  {
        ...state
      }

    default:
      return state
  }
}
