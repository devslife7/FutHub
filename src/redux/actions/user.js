export const setCurrentUser = user => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  }
}
export const logOutCurrentUser = () => {
  return {
    type: 'LOGOUT_CURRENT_USER',
  }
}
export const addFavoriteLeague = (currentLeague, currentUserId) => {
  return dispatch => {
    // Mock implementation - just dispatch the action
    setTimeout(() => {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: currentLeague })
    }, 300)
  }
}
export const removeFavoriteLeague = userRelationshipId => {
  return dispatch => {
    // Mock implementation - just dispatch the action
    setTimeout(() => {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: userRelationshipId })
    }, 300)
  }
}
export const addWatchParty = watchparty => {
  return {
    type: 'ADD_WATCHPARTY',
    payload: watchparty,
  }
}
export const removeWatchParty = watchpartyId => {
  return {
    type: 'REMOVE_WATCHPARTY',
    payload: watchpartyId,
  }
}
export const replaceWatchParty = watchparty => {
  return {
    type: 'REPLACE_WATCHPARTY',
    payload: watchparty,
  }
}
export const addFriend = friend => {
  return {
    type: 'ADD_FRIEND',
    payload: friend,
  }
}
export const removeFriend = friendId => {
  return {
    type: 'REMOVE_FRIEND',
    payload: friendId,
  }
}
export const removeInvitation = invitationId => {
  return {
    type: 'REMOVE_INVITATION',
    payload: invitationId,
  }
}
export const fetchRemoveInv = invitationId => {
  return (dispatch, getState) => {
    // Mock implementation - just dispatch the action
    setTimeout(() => {
      dispatch({ type: 'REMOVE_INVITATION', payload: invitationId })
    }, 300)
  }
}
export const fetchInvitationCon = invitationId => {
  return {
    type: 'REMOVE_INVITATION',
    payload: invitationId,
  }
}
