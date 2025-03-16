export function initGame(mode, refs, setGameMode, setIsPaused, setPlayer1Score, setPlayer2Score, resetPositions, forceRenderPaddles, updateGame) {
    const { menuRef, gameContainerRef, pauseInfoRef, gameOverModalRef, player1ScoreRef, player2ScoreRef, gameStateRef } = refs;
    if (gameStateRef.current.gameInterval) {
        clearInterval(gameStateRef.current.gameInterval);
        gameStateRef.current.gameInterval = null;
    }
    setGameMode(mode);
    menuRef.current.style.display = 'none';
    gameContainerRef.current.style.display = 'block';
    pauseInfoRef.current.style.display = 'block';
    gameOverModalRef.current.style.display = 'none';
    setIsPaused(false);
    gameStateRef.current.isGameOver = false;
    gameStateRef.current.isPaused = false;
    gameStateRef.current.gameStatus = 'running';
    gameStateRef.current.keys = {};
    setPlayer1Score(0);
    setPlayer2Score(0);
    if (player1ScoreRef.current) player1ScoreRef.current.textContent = '0';
    if (player2ScoreRef.current) player2ScoreRef.current.textContent = '0';
    resetPositions();
    forceRenderPaddles();
    setTimeout(() => {
        if (gameStateRef.current.gameStatus === 'running') {
            gameStateRef.current.gameInterval = setInterval(() => {
                if (!gameStateRef.current.isPaused && gameStateRef.current.gameStatus === 'running') {
                    updateGame();
                }
            }, 1000 / 60);
        }
    }, 100);
}