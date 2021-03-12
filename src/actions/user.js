const serverURL = process.env.REACT_APP_SERVER_URL

const favLeaguesAddURL = serverURL + "favLeagues/add/"
const favLeaguesRemoveURL = serverURL + "favLeagues/remove/"

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  }
}
export const logOutCurrentUser = () => {
  return {
    type: "LOGOUT_CURRENT_USER",
  }
}
export const addFavoriteLeague = (currentLeague, currentUserId) => {
  return dispatch => {
    const postRequest = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_league: {
          user_id: currentUserId,
          league_id: currentLeague.id,
        },
      }),
    }
    fetch(favLeaguesAddURL, postRequest)
      .then(resp => resp.json())
      .then(() => dispatch({ type: "ADD_TO_FAVORITES", payload: currentLeague }))
  }
}
export const removeFavoriteLeague = userRelationshipId => {
  return dispatch => {
    fetch(favLeaguesRemoveURL + userRelationshipId, { method: "DELETE" })
      .then(resp => resp.json())
      .then(() => dispatch({ type: "REMOVE_FROM_FAVORITES", payload: userRelationshipId }))
  }
}
export const addWatchParty = watchparty => {
  return {
    type: "ADD_WATCHPARTY",
    payload: watchparty,
  }
}
export const removeWatchParty = watchpartyId => {
  return {
    type: "REMOVE_WATCHPARTY",
    payload: watchpartyId,
  }
}
export const replaceWatchParty = watchparty => {
  return {
    type: "REPLACE_WATCHPARTY",
    payload: watchparty,
  }
}
export const addFriend = friend => {
  return {
    type: "ADD_FRIEND",
    payload: friend,
  }
}
export const removeFriend = friendId => {
  return {
    type: "REMOVE_FRIEND",
    payload: friendId,
  }
}
export const removeInvitation = invitationId => {
  return {
    type: "REMOVE_INVITATION",
    payload: invitationId,
  }
}
export const fetchRemoveInv = invitationId => {
  const serverURL = process.env.REACT_APP_SERVER_URL
  const user_invitationURL = serverURL + "user_invitations/remove/"

  return (dispatch, getState) => {
    const userId = getState().user.currentUser.id

    const postRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        invitation_id: invitationId,
      }),
    }

    fetch(user_invitationURL, postRequest)
      .then(resp => resp.json())
      .then(() => dispatch({ type: "REMOVE_INVITATION", payload: invitationId }))
  }
}
export const fetchInvitationCon = invitationId => {
  return {
    type: "REMOVE_INVITATION",
    payload: invitationId,
  }
}
