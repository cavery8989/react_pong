import React from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import {connect} from 'react-redux';
import {HotKeys} from 'react-hotkeys';
import { checkForContact } from '../helpers/ballHelpers';
import actions from '../redux/actions/actions';

const Styles = {
  height: '500px',
  width: '750px',
  background: 'lightBlue',
};

let drawTimer;

const Board = React.createClass({

  handlePaddleUp: function () {
    console.log('handling paddle up');

    let currentY = this.props.paddleOneY;
    if (currentY >= 0) {
      let newY = currentY -= 10;
      newY = newY < 0 ? 0 : newY;
      this.props.movePaddle(newY);
    }
  },
  handlePaddleDown: function () {
    console.log('handling paddle Down');
    let currentY = this.props.paddleOneY;
    if (currentY < 500 - 120) {
      let newY = currentY += 8;
      this.props.movePaddle(newY);
    }
  },
  moveBall: function () {
    //Update X pos
    let currentXPos = this.props.ballXPos;
    let xVol = this.props.ballXVol;

    let newXPos = currentXPos + xVol;
    if(newXPos + 75 >= 750){
      // newXPos = newXPos - (xVol*2);
      // this.props.setBallXVol(xVol * -1);
      this.handleReset();
      return null;
    }
    if(newXPos <= 0){
      // newXPos = newXPos - (xVol*2);
      // this.props.setBallXVol(xVol * -1);
      this.handleReset();
      return null;
    }





    // Check for contact with paddle



    //  Update Y pos

    let currentYPos = this.props.ballYPos;
    let yVol = this.props.ballYVol;

    console.log(currentYPos);
    console.log(yVol);
    let newYPos = currentYPos + yVol;
    if(currentYPos <= -120 ){
      newYPos = newYPos - (yVol * 2);
      this.props.setBallYVol(yVol * -1);
    }
    if(newYPos >= 304){
      newYPos = newYPos - (yVol * 2);
      this.props.setBallYVol(yVol * -1);
    }

    // Check for contact with paddle.

    if(newXPos <= 20){
      // check for contact
      let paddleY = this.props.paddleOneY;
      if(checkForContact(newYPos, paddleY)){
        console.log('returnd true-------------------------------------------------------------------------------');
        newXPos = newXPos - (xVol*2);
        this.props.setBallXVol(xVol * -1);
      }
    }

    this.props.setBallYPos(newYPos);
    this.props.setBallXPos(newXPos);


  },

  handleStart: function () {
    console.log('START');
    console.log(this.props.ballYPos);
    console.log(this.props.ballYVol);
    clearInterval(drawTimer);
    drawTimer = setInterval(this.moveBall,150);

    // 16.66 60fps
  },

  handleReset: function () {
    clearInterval(drawTimer);
    this.props.resetBall();

  },

  componentDidMount: function () {

  },

  render: function () {

    const handlers = {
      'paddleUp': this.handlePaddleUp,
      'paddleDown': this.handlePaddleDown
    };

    return (
      <HotKeys handlers={handlers}>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handleReset}>Reset</button>
        <div onClick={this.handleClick} onKeyPress={this.handleInput} style={Styles} className="board">
          <Paddle yPos={this.props.paddleOneY}/>
          <Ball xPos={this.props.ballXPos} yPos={this.props.ballYPos}/>
        </div>

      </HotKeys>
    )
  }
});


function mapStateToProps(state) {
  return {
    paddleOneY: state.paddleReducer.paddleOneY,
    gameRunning: state.gameStateReducer.running,
    ballXPos: state.ballReducer.xPos,
    ballYPos: state.ballReducer.yPos,
    ballXVol: state.ballReducer.xVol,
    ballYVol: state.ballReducer.yVol
  }
}

function mapDispatchToProps(dispatch) {
  return {
    movePaddle: function (value) {
      dispatch(actions.setPaddleOneY(value));
    },
    setBallXPos: function (value) {
      dispatch(actions.setBallXPos(value));
    },
    setBallXVol : function (value) {
      dispatch(actions.setBallXVol(value));
    },
    setBallYPos: function (value) {
      console.log(value);
      dispatch(actions.setBallYPos(value));
    },
    setBallYVol : function (value) {
      dispatch(actions.setBallYVol(value));
    },
    resetBall : function () {
      dispatch(actions.resetBall());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);