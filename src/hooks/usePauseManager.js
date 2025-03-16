import { useEffect, useRef } from 'react';
import styles from '@/app/components/PongGame/PongGame.module.css';

export function usePauseManager({
  isPaused,
  gameStateRef,
  gameContainerRef,
  updateGame,
  isCountdownActive
}) {
  const pauseMessageRef = useRef(null);
  
  useEffect(() => {
    if (isCountdownActive || gameStateRef.current.gameStatus === 'countdown') {
      return;
    }
    
    if (gameStateRef.current.gameStatus !== 'running' && 
        gameStateRef.current.gameStatus !== 'paused') {
      return;
    }
  
    if (isPaused !== gameStateRef.current.isPaused) {
      gameStateRef.current.isPaused = isPaused;
      gameStateRef.current.gameStatus = isPaused ? 'paused' : 'running';
    }
  
    if (isPaused) {
      if (gameStateRef.current.gameInterval) {
        clearInterval(gameStateRef.current.gameInterval);
        gameStateRef.current.gameInterval = null;
      }
      
      if (!pauseMessageRef.current) {
        const pauseMessage = document.createElement('div');
        pauseMessage.id = 'pauseMessage';
        pauseMessage.className = styles.pauseMessage;
        pauseMessage.textContent = 'JOGO PAUSADO (ESC para continuar)';
        
        if (gameContainerRef.current) {
          gameContainerRef.current.appendChild(pauseMessage);
          pauseMessageRef.current = pauseMessage;
        } else {
          return;
        }
      }
    } else {
      if (gameStateRef.current.gameStatus === 'running' && !gameStateRef.current.gameInterval) {
        gameStateRef.current.gameInterval = setInterval(updateGame, 1000 / 60);
      }
      
      if (pauseMessageRef.current) {
        pauseMessageRef.current.remove();
        pauseMessageRef.current = null;
      }
    }
  }, [isPaused, isCountdownActive, updateGame]);

  const clearGameInterval = () => {
    if (gameStateRef.current.gameInterval) {
      clearInterval(gameStateRef.current.gameInterval);
      gameStateRef.current.gameInterval = null;
    }
    
    if (pauseMessageRef.current) {
      pauseMessageRef.current.remove();
      pauseMessageRef.current = null;
    }
  };

  return { clearGameInterval };
}