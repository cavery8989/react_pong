import * as types from '../actions/types'

const state = {
  xPos: 400,
  yPos: 200,
  xVol: -4,
  yVol: -4
};

function ballReducer(initialState, action) {
  initialState = initialState || state;
  let newState = Object.assign({}, initialState);

  if(action.type === types.SET_BALL_X_POS){
    newState.xPos = action.value;
  }
  if(action.type === types.SET_BALL_Y_POS){
    newState.yPos = action.value;
  }
  if(action.type === types.SET_BALL_X_VOL){
    newState.xVol = action.value;
  }
  if(action.type === types.SET_BALL_Y_VOL){
    newState.yVol = action.value;
  }
  if(action.type === types.RESET_BALL){
    newState = Object.assign({},state);
    console.log(newState);
  }
  return newState;

}

export default ballReducer;