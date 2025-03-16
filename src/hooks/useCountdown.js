import { useCallback } from 'react';

export function useCountdown({
  gameStateRef,
  setIsPaused,
  setIsCountdownActive,
  countdownOverlayRef,
  countdownNumberRef,
  handleKeyDown
}) {
  const startCountdown = useCallback((callback) => {
    gameStateRef.current.gameStatus = 'countdown';
    gameStateRef.current.isPaused = true;
    setIsPaused(true);
    setIsCountdownActive(true);
    gameStateRef.current.ballSpeedX = 0;
    gameStateRef.current.ballSpeedY = 0;
    
    if (countdownOverlayRef.current) {
      countdownOverlayRef.current.style.display = 'flex';
    }
    
    let count = 3;
    if (countdownNumberRef.current) {
      countdownNumberRef.current.textContent = count;
    }
    
    document.removeEventListener('keydown', handleKeyDown);
    
    const countdownKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        return false;
      }
      gameStateRef.current.keys[e.key] = true;
    };
    
    const countdownKeyUp = (e) => {
      gameStateRef.current.keys[e.key] = false;
    };
    
    document.addEventListener('keydown', countdownKeyDown, { capture: true });
    document.addEventListener('keyup', countdownKeyUp);
    
    const countdownInterval = setInterval(() => {
      count--;
      if (countdownNumberRef.current) {
        countdownNumberRef.current.textContent = count;
      }
      
      if (count <= 0) {
        clearInterval(countdownInterval);
        if (countdownOverlayRef.current) {
          countdownOverlayRef.current.style.display = 'none';
        }
        
        document.removeEventListener('keydown', countdownKeyDown, { capture: true });
        document.removeEventListener('keyup', countdownKeyUp);
        document.addEventListener('keydown', handleKeyDown);
        setIsCountdownActive(false);
        gameStateRef.current.gameStatus = 'running';
        gameStateRef.current.isPaused = false;
        setIsPaused(false);
        
        if (callback) callback();
      }
    }, 1000);
    
    const backupTimeout = setTimeout(() => {
      if (gameStateRef.current.gameStatus === 'countdown') {
        clearInterval(countdownInterval);
        document.removeEventListener('keydown', countdownKeyDown, { capture: true });
        document.removeEventListener('keyup', countdownKeyUp);
        document.addEventListener('keydown', handleKeyDown);
        
        if (countdownOverlayRef.current) {
          countdownOverlayRef.current.style.display = 'none';
        }
        
        setIsCountdownActive(false);
        gameStateRef.current.gameStatus = 'running';
        gameStateRef.current.isPaused = false;
        setIsPaused(false);
        
        if (callback) callback();
      }
    }, 4000);
    
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(backupTimeout);
      document.removeEventListener('keydown', countdownKeyDown, { capture: true });
      document.removeEventListener('keyup', countdownKeyUp);
      document.addEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return { startCountdown };
}