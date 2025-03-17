import React from 'react';
import styles from './MobileControls.module.css';
import Button from '../Button';

export default function MobileControls({
  handleUpButtonTouch,
  handleDownButtonTouch,
  handleButtonTouchEnd,
  togglePause,
  isPaused,
  isCountdownActive,
  gameStatus
}) {
  return (
    <div className={`${styles.mobileControls} ${styles.mobileOnly}`}>
      <Button
        id="upButton"
        className={styles.upButton}
        onTouchStart={handleUpButtonTouch}
        onTouchEnd={handleButtonTouchEnd}
        onMouseDown={handleUpButtonTouch}
        onMouseUp={handleButtonTouchEnd}
      >
        ▲
      </Button>
      <Button
        id="pauseButton"
        className={`${styles.pauseButton} ${isCountdownActive ? styles.disabledButton : ''}`}
        onClick={!isCountdownActive && gameStatus !== 'countdown' ? togglePause : undefined}
        disabled={isCountdownActive || gameStatus === 'countdown'}
      >
        {isPaused ? '▶' : 'II'}
      </Button>
      <Button
        id="downButton"
        className={styles.downButton}
        onTouchStart={handleDownButtonTouch}
        onTouchEnd={handleButtonTouchEnd}
        onMouseDown={handleDownButtonTouch}
        onMouseUp={handleButtonTouchEnd}
      >
        ▼
      </Button>
    </div>
  );
}