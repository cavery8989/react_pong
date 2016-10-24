// const ballHelpers = {
//   checkForContact
// };

export function checkForContact (ballY, paddleY) {
  console.log('checking')

  const paddleHeight = 120;
  const ballHeight = 75;
  const ballCenter = ballY + (ballHeight / 2);
  return (ballCenter > paddleY && ballY < (paddleY + paddleHeight));
}
