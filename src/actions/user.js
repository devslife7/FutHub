const favLeaguesAddURL = "http://localhost:3000/favLeagues/add"
const favLeaguesRemoveURL = "http://localhost:3000/favLeagues/remove/"

export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user
  }
}
export const logOutCurrentUser = () => {
  return {
    type: "LOGOUT_CURRENT_USER"
  }
}
export const addFavoriteLeague = (currentLeague, currentUserId) => {
  return dispatch => {

    const postRequest = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user_league: {
          user_id: currentUserId,
          league_id: currentLeague.id
        }
      })
    }
    fetch(favLeaguesAddURL, postRequest)
      .then( resp => resp.json() )
      .then( () => dispatch({ type: "ADD_TO_FAVORITES", payload: currentLeague }))
  }
}
export const removeFavoriteLeague = userRelationshipId => {
  return dispatch => {
    fetch(favLeaguesRemoveURL + userRelationshipId, { method: 'DELETE' })
      .then( resp => resp.json() )
      .then( () => dispatch({ type: "REMOVE_FROM_FAVORITES", payload: userRelationshipId }) )
  }
}