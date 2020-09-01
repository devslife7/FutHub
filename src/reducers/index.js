import { combineReducers } from 'redux';
import leaguesReducer from './leagues';
import userReducer from './user';

export default combineReducers({
  leagues: leaguesReducer,
  user: userReducer
});


