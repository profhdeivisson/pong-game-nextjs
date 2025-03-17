'use client';
import { useEffect, useRef } from 'react';
import styles from './PongGame.module.css';
import { initGame } from '@/utils/initGame';
import { forceRenderPaddles } from '@/utils/paddleUtils';
import { showMenu as showMenuUtil } from '@/utils/menuUtils';
import { checkGameOver as checkGameOverUtil } from '@/utils/gameOverUtils';
import { resetPositions as resetPositionsUtil } from '@/utils/positionUtils';
import { updateGame as updateGameUtil } from '@/utils/gameUpdateUtils';
import { 
  handleSinglePlayerClick as handleSinglePlayerClickUtil,
  handleMultiPlayerClick as handleMultiPlayerClickUtil,
  handleInstructionsClick as handleInstructionsClickUtil,
  closeInstructions as closeInstructionsUtil
} from '@/utils/eventHandlers';
import { useGameState } from '@/hooks/useGameState';
import { usePauseManager } from '@/hooks/usePauseManager';
import { useCountdown } from '@/hooks/useCountdown';

// Import new components
import Button from '../Button';
import GameMenu from '../GameMenu';
import GameBoard from '../GameBoard';
import InstructionsModal from '../InstructionsModal';
import MobileControls from '../MobileControls';
import CountdownOverlay from '../CountdownOverlay';
import GameOverModal from '../GameOverModal';

export default function PongGame() {
  const {
    gameMode,
    setGameMode,
    isPaused,
    setIsPaused,
    isMobile,
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
  } = useGameState();

  const gameContainerRef = useRef(null);
  const ballRef = useRef(null);
  const paddle1Ref = useRef(null);
  const paddle2Ref = useRef(null);
  const player1ScoreRef = useRef(null);
  const player2ScoreRef = useRef(null);
  const menuRef = useRef(null);
  const countdownOverlayRef = useRef(null);
  const countdownNumberRef = useRef(null);
  const gameOverModalRef = useRef(null);
  const gameOverMessageRef = useRef(null);
  const pauseInfoRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(gameStateRef.current.gameInterval);
    };
  }, []);

  function handleForceRenderPaddles() {
    forceRenderPaddles(gameStateRef, gameContainerRef, paddle1Ref, paddle2Ref);
  }

  useEffect(() => {
    if (!isCountdownActive && gameStateRef.current.gameStatus === 'running') {
    }
  }, [isCountdownActive, handleKeyDown]);

  function startGame(mode) {
    gameStateRef.current.isGameOver = false;

    const refs = {
      menuRef,
      gameContainerRef,
      pauseInfoRef,
      gameOverModalRef,
      player1ScoreRef,
      player2ScoreRef,
      gameStateRef
    };
    
    initGame(mode, refs, setGameMode, setIsPaused, setPlayer1Score, setPlayer2Score, resetPositions, handleForceRenderPaddles, updateGame);
  }

  function resetPositions() {
    const positionParams = {
      gameStateRef,
      gameContainerRef,
      ballRef,
      paddle1Ref,
      paddle2Ref
    };
    
    resetPositionsUtil(positionParams);
  }

  useEffect(() => {
    gameModeRef.current = gameMode;
  }, [gameMode]);

  useEffect(() => {
    if (player1ScoreRef.current) {
      player1ScoreRef.current.textContent = player1Score.toString();
    }
  }, [player1Score]);

  useEffect(() => {
    if (player2ScoreRef.current) {
      player2ScoreRef.current.textContent = player2Score.toString();
    }
  }, [player2Score]);

  function updateGame() {
    const updateParams = {
      isPaused,
      gameStateRef,
      gameModeRef,
      isMobile,
      gameContainerRef,
      ballRef,
      paddle1Ref,
      paddle2Ref,
      player1ScoreRef,
      player2ScoreRef,
      player1Score,
      player2Score,
      setPlayer1Score,
      setPlayer2Score,
      resetPositions,
      checkGameOver
    };
    
    updateGameUtil(updateParams);
  }

  function checkGameOver(p1Score, p2Score) {
    const gameOverParams = {
      p1Score,
      p2Score,
      gameMode,
      gameStateRef,
      gameOverMessageRef,
      gameOverModalRef
    };
    
    checkGameOverUtil(gameOverParams);
  }

  function showMenu() {
    const menuParams = {
      clearGameInterval,
      gameStateRef,
      gameContainerRef,
      ballRef,
      paddle1Ref,
      paddle2Ref,
      player1ScoreRef,
      player2ScoreRef,
      pauseInfoRef,
      menuRef,
      gameOverModalRef,
      setPlayer1Score,
      setPlayer2Score,
      setIsPaused
    };
    
    showMenuUtil(menuParams);
  }

  function restartGame() {
    gameOverModalRef.current.style.display = 'none';
    startGame(gameMode);
  }

  const { startCountdown } = useCountdown({
    gameStateRef,
    setIsPaused,
    setIsCountdownActive,
    countdownOverlayRef,
    countdownNumberRef,
    handleKeyDown
  });
  
  const { clearGameInterval } = usePauseManager({
    isPaused,
    gameStateRef,
    gameContainerRef,
    updateGame,
    isCountdownActive
  });

  useEffect(() => {
    if (isCountdownActive || gameStateRef.current.gameStatus === 'countdown') {
      return;
    }
    
    if (isPaused) {
      if (gameStateRef.current.gameInterval) {
        clearInterval(gameStateRef.current.gameInterval);
        gameStateRef.current.gameInterval = null;
      }
    } else if (gameStateRef.current.gameStatus === 'running') {
      setTimeout(() => {
        if (!gameStateRef.current.gameInterval && 
            gameStateRef.current.gameStatus === 'running' && 
            !gameStateRef.current.isPaused) {
          gameStateRef.current.gameInterval = setInterval(updateGame, 1000 / 60);
        }
      }, 50);
    }
  }, [isPaused, isCountdownActive]);

  function handleSinglePlayerClick() {
    const params = {
      gameContainerRef,
      menuRef,
      handleForceRenderPaddles,
      startCountdown,
      startGame
    };
    
    handleSinglePlayerClickUtil(params);
  }

  function handleMultiPlayerClick() {
    const params = {
      gameContainerRef,
      menuRef,
      handleForceRenderPaddles,
      startCountdown,
      startGame
    };
    
    handleMultiPlayerClickUtil(params);
  }

  function handleInstructionsClick() {
    handleInstructionsClickUtil();
  }

  function closeInstructions() {
    closeInstructionsUtil();
  }

  return (
    <div className={styles.container}>
      <GameMenu 
        menuRef={menuRef}
        onInstructionsClick={handleInstructionsClick}
        onSinglePlayerClick={handleSinglePlayerClick}
        onMultiPlayerClick={handleMultiPlayerClick}
        isMobile={isMobile}
      />

      <div className={`${styles.pauseInfo} ${styles.desktopOnly}`} ref={pauseInfoRef}>
        Aperte a tecla ESC para pausar o jogo
      </div>

      <div className={styles.gameContainer} id="gameContainer" ref={gameContainerRef}>
        <div id="ball" className={styles.ball} ref={ballRef}></div>
        <div id="paddle1" className={`${styles.paddle} paddle`} ref={paddle1Ref}></div>
        <div id="paddle2" className={`${styles.paddle} paddle`} ref={paddle2Ref}></div>
        
        <div id="score" className={styles.score}>
          <span id="player1Score" className={styles.playerScore} ref={player1ScoreRef}>0</span>
          <span>:</span>
          <span id="player2Score" className={styles.playerScore} ref={player2ScoreRef}>0</span>
        </div>
        
        <CountdownOverlay 
          countdownOverlayRef={countdownOverlayRef}
          countdownNumberRef={countdownNumberRef}
        />
        
        <GameOverModal 
          gameOverModalRef={gameOverModalRef}
          gameOverMessageRef={gameOverMessageRef}
          onRestartGame={restartGame}
          onShowMenu={showMenu}
        />
      </div>

      <InstructionsModal onClose={closeInstructions} />

      {gameMode && isMobile && (
        <MobileControls
          handleUpButtonTouch={handleUpButtonTouch}
          handleDownButtonTouch={handleDownButtonTouch}
          handleButtonTouchEnd={handleButtonTouchEnd}
          togglePause={togglePause}
          isPaused={isPaused}
          isCountdownActive={isCountdownActive}
          gameStatus={gameStateRef.current.gameStatus}
        />
      )}
    </div>
  );
}
