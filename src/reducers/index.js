import { combineReducers } from 'redux';
import leaguesReducer from './leagues';
import userReducer from './user';
// import favoritesReducer from './favorites';

export default combineReducers({
  leagues: leaguesReducer,
  user: userReducer,
  // favorites: favoritesReducer
});


