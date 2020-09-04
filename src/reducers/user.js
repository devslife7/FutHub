export default (
  state = {
    currentUser: {},
    loggedIn: false
  },
  action
  ) => {
  console.log(action)
  
  switch (action.type) {

    case "SET_CURRENT_USER":
      return  {
        ...state,
        currentUser: action.user,
        loggedIn: true
      }
    case "LOGOUT_CURRENT_USER":
      return  {
        ...state,
        currentUser: {},
        loggedIn: false
      }

    default:
      return state
  }
}
