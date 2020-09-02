export default (
  state = {
    currentUser: {}
  },
  action
  ) => {

  switch (action.type) {

    case "SET_CURRENT_USER":
      console.log(action)
      return  {
        ...state,
        currentUser: action.user
      }

    default:
      return state
  }
}
