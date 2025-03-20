export function resetPositions({
  gameStateRef,
  gameContainerRef,
  ballRef,
  paddle1Ref,
  paddle2Ref
}) {
    const containerWidth = gameContainerRef.current.clientWidth;
    const containerHeight = gameContainerRef.current.clientHeight;
    const ball = ballRef.current;
    const paddle1 = paddle1Ref.current;
    const paddle2 = paddle2Ref.current;

    gameStateRef.current.resetGameState();
    
    gameStateRef.current.ballX = containerWidth / 2 - 10;
    gameStateRef.current.ballY = containerHeight / 2 - 10;
    gameStateRef.current.paddle1Y = containerHeight / 2 - 50;
    gameStateRef.current.paddle2Y = containerHeight / 2 - 50;

    ball.style.left = `${gameStateRef.current.ballX}px`;
    ball.style.top = `${gameStateRef.current.ballY}px`;
    paddle1.style.top = `${gameStateRef.current.paddle1Y}px`;
    paddle2.style.top = `${gameStateRef.current.paddle2Y}px`;
}