export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    user
  }
}
export const logOutCurrentUser = () => {
  return {
    type: "LOGOUT_CURRENT_USER"
  }
}