import { useEffect, useCallback, useRef } from 'react';

export function useGameControls({
  gameStateRef,
  isCountdownActive,
  setIsPaused,
  checkMobile
}) {
  const escKeyDebounceRef = useRef(false);

  const togglePause = useCallback(() => {
    if (gameStateRef.current.gameStatus === 'countdown' || isCountdownActive) {
      return;
    }
    
    if (gameStateRef.current.gameStatus !== 'running' && 
        gameStateRef.current.gameStatus !== 'paused') {
      return;
    }
    
    const newPausedState = !gameStateRef.current.isPaused;
    gameStateRef.current.isPaused = newPausedState;
    gameStateRef.current.gameStatus = newPausedState ? 'paused' : 'running';
    
    if (newPausedState && gameStateRef.current.gameInterval) {
      clearInterval(gameStateRef.current.gameInterval);
      gameStateRef.current.gameInterval = null;
    }
    
    setIsPaused(newPausedState);
  }, [isCountdownActive, setIsPaused, gameStateRef]);

  const handleKeyDown = useCallback((e) => {
    if (gameStateRef.current.gameStatus === 'countdown' || isCountdownActive) {
      if (e.key === 'Escape') {
        e.preventDefault();
        return;
      }
    }
    
    gameStateRef.current.keys[e.key] = true;
    
    if (e.key === 'Escape') {
      e.preventDefault();
      
      if (escKeyDebounceRef.current) {
        return;
      }
      escKeyDebounceRef.current = true;
      if (gameStateRef.current.gameStatus === 'running' || 
          gameStateRef.current.gameStatus === 'paused') {
        togglePause();
      }
      
      setTimeout(() => {
        escKeyDebounceRef.current = false;
      }, 300);
    }
  }, [isCountdownActive, togglePause, gameStateRef]);

  const handleKeyUp = useCallback((e) => {
    gameStateRef.current.keys[e.key] = false;
  }, []);

  const handleUpButtonTouch = useCallback(() => {
    gameStateRef.current.keys.mobileUp = true;
  }, [gameStateRef]);

  const handleDownButtonTouch = useCallback(() => {
    gameStateRef.current.keys.mobileDown = true;
  }, [gameStateRef]);

  const handleButtonTouchEnd = useCallback(() => {
    gameStateRef.current.keys.mobileUp = false;
    gameStateRef.current.keys.mobileDown = false;
  }, [gameStateRef]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('keyup', handleKeyUp, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      if (gameStateRef.current.gameInterval) {
        clearInterval(gameStateRef.current.gameInterval);
        gameStateRef.current.gameInterval = null;
      }
    };
  }, [handleKeyDown, handleKeyUp, isCountdownActive]);

  return {
    handleKeyDown,
    handleKeyUp,
    togglePause,
    handleUpButtonTouch,
    handleDownButtonTouch,
    handleButtonTouchEnd
  };
}