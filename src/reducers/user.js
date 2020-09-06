const initialState = {
  currentUser: {
    friends: [],
    favLeagues: []
  },
  loggedIn: false
}

export default ( state = initialState, action ) => {

  switch (action.type) {
    case "SET_CURRENT_USER":
      const { id, name, username, profile_img, friends, user_leagues  } = action.payload

      const parsedUserLeagues = user_leagues.map( user_league => {
        return {
          ...user_league.league,
          userRelationshipId: user_league.id
        }
      })

      const parsedCurrentUser = {
        id, name, username, profile_img, friends,
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
      let idx = state.currentUser.favLeagues.findIndex( league => league.userRelationshipId === action.payload )

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

    default:
      return state
  }
}
