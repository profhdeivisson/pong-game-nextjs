import React from 'react';
import styles from './CountdownOverlay.module.css';

export default function CountdownOverlay({ countdownOverlayRef, countdownNumberRef }) {
  return (
    <div id="countdownOverlay" className={styles.countdownOverlay} ref={countdownOverlayRef}>
      <div id="countdownNumber" className={styles.countdownNumber} ref={countdownNumberRef}>3</div>
    </div>
  );
}