import { combineReducers } from 'redux';
import leaguesReducer from './leagues';

export default combineReducers({
  leagues: leaguesReducer
});


