import { format } from 'date-fns'
const initialState = {
  currentMatch: {
    fixture: {
      id: null,
      referee: '',
      timezone: 'UTC',
      date: '',
      timestamp: null,
      periods: {
        first: null,
        second: null,
      },
      venue: {
        id: null,
        name: '',
        city: '',
      },
      status: {
        long: '',
        short: 'FT',
        elapsed: 90,
      },
    },
    league: {
      id: null,
      name: '',
      country: 'Wold',
      logo: '/broken-image.jpg',
      flag: '/broken-image.jpg',
      season: null,
      round: '',
    },
    teams: {
      home: {
        id: null,
        name: '',
        logo: '/broken-image.jpg',
        winner: false,
      },
      away: {
        id: null,
        name: '',
        logo: '/broken-image.jpg',
        winner: true,
      },
    },
    goals: {
      home: null,
      away: null,
    },
    score: {
      halftime: {
        home: null,
        away: null,
      },
      fulltime: {
        home: null,
        away: null,
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
