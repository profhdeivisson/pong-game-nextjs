export function forceRenderPaddles(gameStateRef, gameContainerRef, paddle1Ref, paddle2Ref) {
  const containerHeight = gameContainerRef.current.clientHeight;
  const paddle1 = paddle1Ref.current;
  const paddle2 = paddle2Ref.current;

  paddle1.style.height = '100px';
  paddle2.style.height = '100px';

  if (containerHeight > 0) {
    gameStateRef.current.paddle1Y = containerHeight / 2 - 50;
    gameStateRef.current.paddle2Y = containerHeight / 2 - 50;
  } else {
    gameStateRef.current.paddle1Y = 200;
    gameStateRef.current.paddle2Y = 200;
  }

  paddle1.style.top = `${gameStateRef.current.paddle1Y}px`;
  paddle2.style.top = `${gameStateRef.current.paddle2Y}px`;
  paddle1.style.left = '10px';
  paddle2.style.right = '10px';

  paddle1.style.display = 'block';
  paddle2.style.display = 'block';

  void paddle1.offsetHeight;
  void paddle2.offsetHeight;
}