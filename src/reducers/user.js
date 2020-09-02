export default (
  state = {
    currentUser: {},
    loggedIn: false
  },
  action
  ) => {

  switch (action.type) {

    case "SET_CURRENT_USER":
      console.log(action)
      return  {
        ...state,
        currentUser: action.user,
        loggedIn: true
      }
    case "LOGOUT_CURRENT_USER":
      console.log(action)
      return  {
        ...state,
        currentUser: {},
        loggedIn: false
      }

    default:
      return state
  }
}
