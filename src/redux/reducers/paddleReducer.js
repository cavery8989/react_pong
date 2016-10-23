import * as types from '../actions/types';
const state = {
  paddleOneY: 200,
  paddleTwoY: 200
};

function paddleReducer (initialState, action) {
initialState = initialState || state;

  let newState = Object.assign({}, initialState);

  if(action.type === types.SET_P1_Y){
    newState.paddleOneY = action.value;
  }
  if(action.type === types.RESET_P1_Y){
    newState.paddleOneY = 200;
  }
  if(action.type === types.SET_P2_Y){
    newState.paddleTwoY = action.value;
  }
  if(action.type === types.RESET_P2_Y){
    newState.paddleTwoY = 200;
  }
  return newState;
}

export default paddleReducer