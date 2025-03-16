export function showMenu({
  clearGameInterval,
  gameStateRef,
  gameContainerRef,
  ballRef,
  paddle1Ref,
  paddle2Ref,
  player1ScoreRef,
  player2ScoreRef,
  pauseInfoRef,
  menuRef,
  gameOverModalRef,
  setPlayer1Score,
  setPlayer2Score,
  setIsPaused
}) {
  clearGameInterval();
  gameStateRef.current.isGameOver = false;
  gameStateRef.current.isPaused = false;
  gameStateRef.current.gameStatus = 'notStarted';

  if (gameContainerRef.current) {
    const containerWidth = gameContainerRef.current.clientWidth;
    const containerHeight = gameContainerRef.current.clientHeight;

    gameStateRef.current.ballX = containerWidth / 2 - 10;
    gameStateRef.current.ballY = containerHeight / 2 - 10;
    gameStateRef.current.ballSpeedX = 0;
    gameStateRef.current.ballSpeedY = 0;
    gameStateRef.current.paddle1Y = containerHeight / 2 - 50;
    gameStateRef.current.paddle2Y = containerHeight / 2 - 50;

    if (ballRef.current) {
      ballRef.current.style.left = `${gameStateRef.current.ballX}px`;
      ballRef.current.style.top = `${gameStateRef.current.ballY}px`;
    }
    if (paddle1Ref.current) {
      paddle1Ref.current.style.top = `${gameStateRef.current.paddle1Y}px`;
    }
    if (paddle2Ref.current) {
      paddle2Ref.current.style.top = `${gameStateRef.current.paddle2Y}px`;
    }
  }

  setPlayer1Score(0);
  setPlayer2Score(0);

  if (player1ScoreRef.current) {
    player1ScoreRef.current.textContent = '0';
  }
  if (player2ScoreRef.current) {
    player2ScoreRef.current.textContent = '0';
  }

  setIsPaused(false);

  if (gameContainerRef.current) {
    gameContainerRef.current.style.display = 'none';
  }
  if (pauseInfoRef.current) {
    pauseInfoRef.current.style.display = 'none';
  }
  if (menuRef.current) {
    menuRef.current.style.display = 'block';
  }
  if (gameOverModalRef.current) {
    gameOverModalRef.current.style.display = 'none';
  }
}