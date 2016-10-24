export function chooseDirection (ballYVol, ballYPos, paddleYPos) {
  if(ballYVol > 0){
    return ballYPos > paddleYPos ? 'down' : 'up';
  }
  if( ballYVol < 0 ){
    return ballYPos < paddleYPos ? 'up' : 'down';
  }
}