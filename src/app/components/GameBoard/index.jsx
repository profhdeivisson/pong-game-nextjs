import React from 'react';
import styles from './GameBoard.module.css';
import Button from '../Button';

export default function GameBoard({
  gameContainerRef,
  ballRef,
  paddle1Ref,
  paddle2Ref,
  player1ScoreRef,
  player2ScoreRef,
  countdownOverlayRef,
  countdownNumberRef,
  gameOverModalRef,
  gameOverMessageRef,
  onRestartGame,
  onShowMenu
}) {
  return (
    <div className={styles.gameContainer} id="gameContainer" ref={gameContainerRef}>
      <div id="ball" className={styles.ball} ref={ballRef}></div>
      <div id="paddle1" className={`${styles.paddle} paddle`} ref={paddle1Ref}></div>
      <div id="paddle2" className={`${styles.paddle} paddle`} ref={paddle2Ref}></div>
      <div id="score" className={styles.score}>
        <span id="player1Score" className={styles.playerScore} ref={player1ScoreRef}>0</span>
        <span>:</span>
        <span id="player2Score" className={styles.playerScore} ref={player2ScoreRef}>0</span>
      </div>
      <div id="countdownOverlay" className={styles.countdownOverlay} ref={countdownOverlayRef}>
        <div id="countdownNumber" className={styles.countdownNumber} ref={countdownNumberRef}>3</div>
      </div>
      <div id="gameOverModal" className={`${styles.modal}`} ref={gameOverModalRef}>
        <div className={`${styles.modalContent}`}>
          <h2 id="gameOverMessage" className={styles.gameOverMessage} ref={gameOverMessageRef}></h2>
          <Button id="restartBtn" className={styles.restartBtn} onClick={onRestartGame}>
            Jogar Novamente
          </Button>
          <Button id="menuBtn" className={styles.menuBtn} onClick={onShowMenu}>
            Voltar ao Menu
          </Button>
        </div>
      </div>
    </div>
  );
}