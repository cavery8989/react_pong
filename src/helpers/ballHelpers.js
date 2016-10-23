// const ballHelpers = {
//   checkForContact
// };

export function checkForContact (ballY, paddleY) {
  console.log('checking')

  const paddleHeight = 120;
  const compensatedBallY = ballY + 120;
  const ballRadius = 37.5;
  const ballCenter = compensatedBallY + ballRadius;
  return (ballCenter > paddleY && ballY < (paddleY + paddleHeight));
}
