import { playSound } from './soundUtils';

export function checkGameOver({
  p1Score,
  p2Score,
  gameMode,
  gameStateRef,
  gameOverMessageRef,
  gameOverModalRef
}) {
  const winningScore = 5;

  // Change to exact match
  if (p1Score === winningScore || p2Score === winningScore) {
    if (gameStateRef.current.gameInterval) {
      clearInterval(gameStateRef.current.gameInterval);
      gameStateRef.current.gameInterval = null;
    }
    gameStateRef.current.isGameOver = true;
    gameStateRef.current.isPaused = false;
    gameStateRef.current.gameStatus = 'gameOver';

    if (p1Score >= winningScore) {
      gameOverMessageRef.current.textContent = gameMode === 'multiplayer' ?
        'Jogador 1 venceu!' : 'Você venceu!';
        playSound('/victorymale-version-230553.mp3');
    } else {
      gameOverMessageRef.current.textContent = gameMode === 'multiplayer' ?
        'Jogador 2 venceu!' : 'Computador venceu!';
        if (gameMode === 'multiplayer') {
          playSound('/victorymale-version-230553.mp3');
        } else {
          playSound('/you-lose.mp3');
        }
    }
    gameOverModalRef.current.style.display = 'flex';
  }
}