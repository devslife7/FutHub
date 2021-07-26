const initialState = {
  currentUser: {
    friends: [],
    favLeagues: [],
    invitations: [],
    watchparties: []
  },
  loggedIn: false
}

export default ( state = initialState, action ) => {
  let idx
  switch (action.type) {
    case "SET_CURRENT_USER":
      const { id, name, username, profile_img, friends, user_leagues, watchparties, invitations } = action.payload

      const parsedUserLeagues = user_leagues.map( user_league => {
        return {
          ...user_league.league,
          userRelationshipId: user_league.id
        }
      })

      const parsedCurrentUser = {
        id, name, username, profile_img, friends, watchparties, invitations,
        favLeagues: parsedUserLeagues
      }

      return  {
        ...state,
        currentUser: parsedCurrentUser,
        loggedIn: true
      }

    case "LOGOUT_CURRENT_USER":
      return  {
        ...state,
        currentUser: {},
        loggedIn: false
      }

    case "ADD_TO_FAVORITES":
      return  {
        ...state,
        currentUser: {
          ...state.currentUser,
          favLeagues: [...state.currentUser.favLeagues.concat(action.payload)]
        }
      }

    case "REMOVE_FROM_FAVORITES":
      idx = state.currentUser.favLeagues.findIndex( league => league.userRelationshipId === action.payload )
      return  {
        ...state,
        currentUser: {
          ...state.currentUser,
          favLeagues: [
            ...state.currentUser.favLeagues.slice(0, idx),
            ...state.currentUser.favLeagues.slice(idx + 1)
          ]
        }
      }
    case  "ADD_WATCHPARTY":
      return  {
        ...state,
        currentUser: {
          ...state.currentUser,
          watchparties: [...state.currentUser.watchparties.concat(action.payload)]
        }
      }
    case  "REPLACE_WATCHPARTY":
      idx = state.currentUser.watchparties.findIndex( wp => wp.id === action.payload.id )
      return  {
        ...state,
        currentUser: {
          ...state.currentUser,
          watchparties: [
            ...state.currentUser.watchparties.slice(0, idx),
            action.payload,
            ...state.currentUser.watchparties.slice(idx + 1)
          ]
        }
      }
    case  "REMOVE_WATCHPARTY":
      idx = state.currentUser.watchparties.findIndex( party => party.id === action.payload )
      console.log('found index', idx)
      return  {
        ...state,
        currentUser: {
          ...state.currentUser,
          watchparties: [
            ...state.currentUser.watchparties.slice(0, idx),
            ...state.currentUser.watchparties.slice(idx + 1)
          ]
        }
      }
    case  "ADD_FRIEND":
      return  {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [
            ...state.currentUser.friends,
            action.payload
          ]
        }
      }
    case  "REMOVE_FRIEND":
      idx = state.currentUser.friends.findIndex( friend => friend.id === action.payload )
      return  {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [
            ...state.currentUser.friends.slice(0, idx),
            ...state.currentUser.friends.slice(idx + 1)
          ]
        }
      }
    case  "REMOVE_INVITATION":
      idx = state.currentUser.invitations.findIndex( inv => inv.id === action.payload )
      return  {
        ...state,
        currentUser: {
          ...state.currentUser,
          invitations: [
            ...state.currentUser.invitations.slice(0, idx),
            ...state.currentUser.invitations.slice(idx + 1)
          ]
        }
      }


    default:
      return state
  }
}
