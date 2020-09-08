const initialState = {
  currentMatch: {
    fixture_id: null,
    league_id: null,
    league: {
      name: "",
      country: "",
      logo: "/broken-image.jpg",
      flag: "/broken-image.jpg"
    },
    event_date: "",
    event_timestamp: null,
    firstHalfStart: null,
    secondHalfStart: null,
    round: "",
    status: "",
    statusShort: "",
    elapsed: 0,
    venue: "",
    referee: "",
    homeTeam: {
      team_id: null,
      team_name: "",
      logo: "/broken-image.jpg"
    },
    awayTeam: {
      team_id: null,
      team_name: "",
      logo: "/broken-image.jpg"
    },
    goalsHomeTeam: 0,
    goalsAwayTeam: 0,
    score: {
        halftime: "",
        fulltime: "",
        extratime: null,
        penalty: null
    }


  },
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_MATCH":
      return {
        ...state,
        currentMatch: action.payload
      }
    default:
      return state
  }
}
