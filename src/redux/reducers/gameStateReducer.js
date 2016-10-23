import * as types from '../actions/types';
const state = {
  running: false
};
function gameStateReducer(initialState, action) {
  initialState = initialState || state;
  let newState = Object.assign({}, initialState);

  if(action.type === types.SET_RUN_TRUE){
    newState.running = true;
  }
  if(action.type === types.SET_RUN_FALSE){
    newState.running = false;
  }
  return newState;
}

export default gameStateReducer;