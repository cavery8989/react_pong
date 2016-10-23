import { combineReducers } from 'redux';

import paddleReducer from './paddleReducer';
import ballReducer from './ballReducer';
import gameStateReducer from './gameStateReducer';

const reducers = {
  paddleReducer,
  ballReducer,
  gameStateReducer
};

const reducer = combineReducers(reducers);

export default reducer;

