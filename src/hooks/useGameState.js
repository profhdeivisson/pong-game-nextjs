import { useState, useRef, useEffect } from 'react';
import { useGameControls } from './useGameControls';
import { useDeviceDetection } from './useDeviceDetection';

export function useGameState() {
  const [gameMode, setGameMode] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const { isMobile, setIsMobile, checkMobile } = useDeviceDetection();

  const gameModeRef = useRef(gameMode);

  const gameStateRef = useRef({
    ballX: 0,
    ballY: 0,
    ballSpeedX: 0,
    ballSpeedY: 0,
    paddle1Y: 0,
    paddle2Y: 0,
    paddleSpeed: 8,
    ballBaseSpeed: 12,
    maxBallSpeed: 15,
    ballSpinFactor: 0.8,
    ballAcceleration: 0.05,
    paddleRebound: 1.05,
    friction: 0.99,
    keys: {},
    gameInterval: null,
    isPaused: false,
    isGameOver: false,
    gameStatus: 'notStarted',
    
    resetGameState() {
        this.ballX = 0;
        this.ballY = 0;
        this.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * this.ballBaseSpeed;
        this.ballSpeedY = (Math.random() * 2 - 1) * this.ballBaseSpeed;
        this.ballAcceleration = 0.05;
        this.paddleSpeed = 8;
    }
});

  useEffect(() => {
    gameModeRef.current = gameMode;
    gameStateRef.current.isPaused = isPaused;
  }, [gameMode, isPaused]);

  const {
    handleKeyDown,
    handleKeyUp,
    handleUpButtonTouch,
    handleDownButtonTouch,
    handleButtonTouchEnd,
    togglePause
  } = useGameControls({
    gameStateRef,
    isCountdownActive,
    setIsPaused,
    checkMobile
  });

  return {
    gameMode,
    setGameMode,
    isPaused,
    setIsPaused,
    isMobile,
    setIsMobile,
    player1Score,
    setPlayer1Score,
    player2Score,
    setPlayer2Score,
    isCountdownActive,
    setIsCountdownActive,
    gameStateRef,
    gameModeRef,
    checkMobile,
    togglePause,
    handleKeyDown,
    handleKeyUp,
    handleUpButtonTouch,
    handleDownButtonTouch,
    handleButtonTouchEnd
  };
}