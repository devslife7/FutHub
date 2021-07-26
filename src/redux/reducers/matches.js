import { format } from 'date-fns'
const initialState = {
  currentMatch: {
    fixture: {
      id: null,
      referee: 'H. Martinez',
      timezone: 'UTC',
      date: '2021-04-07T00:00:00+00:00',
      timestamp: 1617753600,
      periods: {
        first: 1617753600,
        second: 1617757200,
      },
      venue: {
        id: 393,
        name: 'Estadio Alejandro Morera Soto',
        city: 'Alajuela',
      },
      status: {
        long: 'Match Finished',
        short: 'FT',
        elapsed: 90,
      },
    },
    league: {
      id: 16,
      name: 'CONCACAF Champions League',
      country: 'World',
      logo: 'https://media.api-sports.io/football/leagues/16.png',
      flag: null,
      season: 2021,
      round: '8th Finals',
    },
    teams: {
      home: {
        id: 822,
        name: 'LD Alajuelense',
        logo: 'https://media.api-sports.io/football/teams/822.png',
        winner: false,
      },
      away: {
        id: 1608,
        name: 'Atlanta United FC',
        logo: 'https://media.api-sports.io/football/teams/1608.png',
        winner: true,
      },
    },
    goals: {
      home: 0,
      away: 1,
    },
    score: {
      halftime: {
        home: 0,
        away: 0,
      },
      fulltime: {
        home: 0,
        away: 1,
      },
      extratime: {
        home: null,
        away: null,
      },
      penalty: {
        home: null,
        away: null,
      },
    },
  },

  // currentMatch: {
  //   fixture_id: null,
  //   league_id: null,
  //   league: {
  //     name: '',
  //     country: '',
  //     logo: '/broken-image.jpg',
  //     flag: '/broken-image.jpg',
  //   },
  //   event_date: '',
  //   event_timestamp: null,
  //   firstHalfStart: null,
  //   secondHalfStart: null,
  //   round: '',
  //   status: '',
  //   statusShort: '',
  //   elapsed: 0,
  //   venue: '',
  //   referee: '',
  //   homeTeam: {
  //     team_id: null,
  //     team_name: '',
  //     logo: '/broken-image.jpg',
  //   },
  //   awayTeam: {
  //     team_id: null,
  //     team_name: '',
  //     logo: '/broken-image.jpg',
  //   },
  //   goalsHomeTeam: 0,
  //   goalsAwayTeam: 0,
  //   score: {
  //     halftime: '',
  //     fulltime: '',
  //     extratime: null,
  //     penalty: null,
  //   },
  // },
  display: [],
  datePickerDate: new Date(),
  loading: false,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MATCH':
      return {
        ...state,
        currentMatch: action.payload,
      }

    case 'LOADING_MATCHES':
      return {
        ...state,
        loading: true,
      }

    case 'SET_DISPLAY_MATCHES':
      return {
        ...state,
        display: action.payload,
        loading: false,
      }
    case 'SET_DATEPICKER_DATE':
      return {
        ...state,
        datePickerDate: action.payload,
      }
    default:
      return state
  }
}
