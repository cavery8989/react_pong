import React from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import {connect} from 'react-redux';
import {HotKeys} from 'react-hotkeys';
import { checkForContact } from '../helpers/ballHelpers';
import { chooseDirection } from '../helpers/AIhelpers';
import actions from '../redux/actions/actions';

const Styles = {
  height: '500px',
  width: '750px',
  background: 'lightBlue',
  position:'relative'
};

let drawTimer;
let aITimer;

const Board = React.createClass({

  handlePaddleUp: function () {
    console.log('handling paddle up');

    let currentY = this.props.paddleOneY;
    if (currentY >= 0) {
      let newY = currentY -= 10;
      newY = newY < 0 ? 0 : newY;
      this.props.movePlayerPaddle(newY);
    }
  },
  handlePaddleDown: function () {
    console.log('handling paddle Down');
    let currentY = this.props.paddleOneY;
    if (currentY < 500 - 120) {
      let newY = currentY += 8;
      this.props.movePlayerPaddle(newY);
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
    // Update Y
    let currentYPos = this.props.ballYPos;
    let yVol = this.props.ballYVol;
    let newYPos = currentYPos + yVol;
    if(currentYPos <= 0 ){
      newYPos = newYPos - (yVol * 2);
      this.props.setBallYVol(yVol * -1);
    }
    if(newYPos + 75 >= 500){
      newYPos = newYPos - (yVol * 2);
      this.props.setBallYVol(yVol * -1);
    }

    // Check for contact with paddle player.

    if(newXPos <= 20){
      // check for contact
      let paddleOneY = this.props.paddleOneY;
      if(checkForContact(newYPos, paddleOneY)){
        newXPos = newXPos - xVol;
        this.props.setBallXVol(xVol * -1);
      }
    }

    // Check for contact with AI paddle.


    if((newXPos + 75) >= (750 - 20)){
      let paddleTwoY = this.props.paddleTwoY;
      if(checkForContact(newYPos, paddleTwoY)){
        newXPos = newXPos - xVol;
        this.props.setBallXVol(xVol * -1);
      }
    }

    this.props.setBallYPos(newYPos);
    this.props.setBallXPos(newXPos);


  },

  moveAI: function () {
    let ballYVol = this.props.ballYVol;
    let ballYPos = this.props.ballYPos;
    let paddleYPos = this.props.paddleTwoY;
    let direction = chooseDirection(ballYVol, ballYPos, paddleYPos);
    let newPaddleYPos;
    if(direction === 'up') {
      newPaddleYPos = paddleYPos - 5;
    } else if ( direction === 'down'){
      newPaddleYPos = paddleYPos + 5;
    }
    this.props.moveAIPaddle(newPaddleYPos);
  },

  handleStart: function () {
    clearInterval(drawTimer);
    clearInterval(aITimer);
    drawTimer = setInterval(this.moveBall,16.66);
    aITimer = setInterval(this.moveAI, 18);

  },

  handleReset: function () {
    clearInterval(drawTimer);
    clearInterval(aITimer);
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
          <Paddle xPos={0} yPos={this.props.paddleOneY}/>
          <Paddle xPos={750 - 20} yPos={this.props.paddleTwoY}/>
          <Ball xPos={this.props.ballXPos} yPos={this.props.ballYPos}/>
        </div>

      </HotKeys>
    )
  }
});


function mapStateToProps(state) {
  return {
    paddleOneY: state.paddleReducer.paddleOneY,
    paddleTwoY: state.paddleReducer.paddleTwoY,
    gameRunning: state.gameStateReducer.running,
    ballXPos: state.ballReducer.xPos,
    ballYPos: state.ballReducer.yPos,
    ballXVol: state.ballReducer.xVol,
    ballYVol: state.ballReducer.yVol
  }
}

function mapDispatchToProps(dispatch) {
  return {
    movePlayerPaddle: function (value) {
      dispatch(actions.setPaddleOneY(value));
    },
    moveAIPaddle: function (value) {
      dispatch(actions.setPaddleTwoY(value));
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