import React from 'react';
import styles from './GameOverModal.module.css';
import Button from '../Button';

export default function GameOverModal({ 
  gameOverModalRef, 
  gameOverMessageRef, 
  onRestartGame, 
  onShowMenu 
}) {
  return (
    <div id="gameOverModal" className={styles.modal} ref={gameOverModalRef}>
      <div className={styles.modalContent}>
        <h2 id="gameOverMessage" className={styles.gameOverMessage} ref={gameOverMessageRef}></h2>
        <Button id="restartBtn" className={styles.restartBtn} onClick={onRestartGame}>
          Jogar Novamente
        </Button>
        <Button id="menuBtn" className={styles.menuBtn} onClick={onShowMenu}>
          Voltar ao Menu
        </Button>
      </div>
    </div>
  );
}