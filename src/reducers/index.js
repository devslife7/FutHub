import { combineReducers } from 'redux';
import leaguesReducer from './leagues';
import userReducer from './user';
import matchReducer from './matches';

export default combineReducers({
  leagues: leaguesReducer,
  user: userReducer,
  matches: matchReducer,
});


