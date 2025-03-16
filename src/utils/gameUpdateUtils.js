export function updateGame({
  isPaused,
  gameStateRef,
  gameModeRef,
  isMobile,
  gameContainerRef,
  ballRef,
  paddle1Ref,
  paddle2Ref,
  player1ScoreRef,
  player2ScoreRef,
  player1Score,
  player2Score,
  setPlayer1Score,
  setPlayer2Score,
  resetPositions,
  checkGameOver
}) {
  if (isPaused || gameStateRef.current.isPaused || gameStateRef.current.isGameOver) return;
  const state = gameStateRef.current;
  const containerWidth = gameContainerRef.current.clientWidth;
  const containerHeight = gameContainerRef.current.clientHeight;

  if (state.keys.w || state.keys.W || (isMobile && state.keys.mobileUp)) {
    state.paddle1Y = Math.max(0, state.paddle1Y - state.paddleSpeed);
  }
  if (state.keys.s || state.keys.S || (isMobile && state.keys.mobileDown)) {
    state.paddle1Y = Math.min(containerHeight - 100, state.paddle1Y + state.paddleSpeed);
  }

  if (gameModeRef.current === 'multiplayer') {
    if (state.keys.ArrowUp) {
      state.paddle2Y = Math.max(0, state.paddle2Y - state.paddleSpeed);
    }
    if (state.keys.ArrowDown) {
      state.paddle2Y = Math.min(containerHeight - 100, state.paddle2Y + state.paddleSpeed);
    }
  } else {
    const paddle2Center = state.paddle2Y + 50;
    const ballCenter = state.ballY + 10;
    const aiDifficulty = 0.7;

    if (paddle2Center < ballCenter - 10) {
      state.paddle2Y += state.paddleSpeed * aiDifficulty;
    } else if (paddle2Center > ballCenter + 10) {
      state.paddle2Y -= state.paddleSpeed * aiDifficulty;
    }

    state.paddle2Y = Math.max(0, Math.min(containerHeight - 100, state.paddle2Y));
  }

  state.ballSpeedX *= state.friction;
  state.ballSpeedY *= state.friction;

  const currentSpeed = Math.sqrt(state.ballSpeedX * state.ballSpeedX + state.ballSpeedY * state.ballSpeedY);
  if (currentSpeed < state.ballBaseSpeed) {
    const factor = state.ballBaseSpeed / currentSpeed;
    state.ballSpeedX *= factor;
    state.ballSpeedY *= factor;
  }

  if (currentSpeed > state.maxBallSpeed) {
    const factor = state.maxBallSpeed / currentSpeed;
    state.ballSpeedX *= factor;
    state.ballSpeedY *= factor;
  }

  state.ballX += state.ballSpeedX;
  state.ballY += state.ballSpeedY;

  if (state.ballY <= 0 || state.ballY >= containerHeight - 20) {
    state.ballSpeedY = -state.ballSpeedY * 0.98;
    state.ballY = state.ballY <= 0 ? 0 : containerHeight - 20;
    state.ballSpeedX += (Math.random() * 0.4 - 0.2);
  }

  const paddle1Right = 25;
  const paddle2Left = containerWidth - 35;

  if (
    state.ballX <= paddle1Right &&
    state.ballX >= 10 &&
    state.ballY + 20 >= state.paddle1Y &&
    state.ballY <= state.paddle1Y + 100
  ) {
    const hitPosition = ((state.ballY + 10) - (state.paddle1Y + 50)) / 50;
    state.ballSpeedX = -state.ballSpeedX * state.paddleRebound;
    state.ballSpeedY += hitPosition * state.ballSpinFactor * Math.abs(state.ballSpeedX);
    state.ballX = paddle1Right + 1;
    state.ballSpeedX += (state.ballSpeedX > 0 ? state.ballAcceleration : -state.ballAcceleration);
  }

  if (
    state.ballX + 20 >= paddle2Left &&
    state.ballX <= containerWidth - 10 &&
    state.ballY + 20 >= state.paddle2Y &&
    state.ballY <= state.paddle2Y + 100
  ) {
    const hitPosition = ((state.ballY + 10) - (state.paddle2Y + 50)) / 50;
    state.ballSpeedX = -state.ballSpeedX * state.paddleRebound;
    state.ballSpeedY += hitPosition * state.ballSpinFactor * Math.abs(state.ballSpeedX);
    state.ballX = paddle2Left - 21;
    state.ballSpeedX += (state.ballSpeedX > 0 ? state.ballAcceleration : -state.ballAcceleration);
  }

  if (state.ballX < 0) {
    setPlayer2Score(prevScore => {
      const newScore = prevScore + 1;

      if (player2ScoreRef.current) {
        player2ScoreRef.current.textContent = newScore.toString();
      }

      setTimeout(() => checkGameOver(player1Score, newScore), 0);
      return newScore;
    });
    resetPositions();
  } else if (state.ballX > containerWidth - 20) {
    setPlayer1Score(prevScore => {
      const newScore = prevScore + 1;
      if (player1ScoreRef.current) {
        player1ScoreRef.current.textContent = newScore.toString();
      }
      setTimeout(() => checkGameOver(newScore, player2Score), 0);
      return newScore;
    });
    resetPositions();
  }

  ballRef.current.style.left = `${state.ballX}px`;
  ballRef.current.style.top = `${state.ballY}px`;
  paddle1Ref.current.style.top = `${state.paddle1Y}px`;
  paddle2Ref.current.style.top = `${state.paddle2Y}px`;
}