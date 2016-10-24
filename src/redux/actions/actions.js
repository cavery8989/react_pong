import * as types from './types';

let actions = {};

actions.setPaddleOneY = function (value) {
  return {
    type: types.SET_P1_Y,
    value: value
  }
};

actions.resetPaddleOneY = function () {
  return {
    type: types.RESET_P1_Y,

  }
};

actions.setPaddleTwoY = function (value) {
  return {
    type: types.SET_P2_Y,
    value: value
  }
};

actions.resetPaddleTwoY = function () {
  return {
    type: types.RESET_P2_Y
  }
};

//   ball actions

actions.setBallXPos = function (value) {
  return {
    type: types.SET_BALL_X_POS,
    value
  }
};

actions.setBallYPos = function (value) {
  return {
    type: types.SET_BALL_Y_POS,
    value
  }
};

actions.setBallXVol = function (value) {
  return {
    type: types.SET_BALL_X_VOL,
    value
  }
};

actions.setBallYVol = function (value) {
  return {
    type: types.SET_BALL_Y_VOL,
    value
  }
};

actions.resetBall = function () {
  return {
    type: types.RESET_BALL
  }
};

// game state

actions.setRunTrue = function () {
  return {
    type: types.SET_RUN_TRUE
  }
};

actions.setRunTrue = function () {
  return {
    type: types.SET_RUN_FALSE
  }
};

export default actions;