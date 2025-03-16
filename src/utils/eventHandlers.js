export function handleSinglePlayerClick({
  gameContainerRef,
  menuRef,
  handleForceRenderPaddles,
  startCountdown,
  startGame
}) {
  gameContainerRef.current.style.display = 'block';
  menuRef.current.style.display = 'none';
  handleForceRenderPaddles();
  startCountdown(() => {
    startGame('singleplayer');
  });
}

export function handleMultiPlayerClick({
  gameContainerRef,
  menuRef,
  handleForceRenderPaddles,
  startCountdown,
  startGame
}) {
  gameContainerRef.current.style.display = 'block';
  menuRef.current.style.display = 'none';
  handleForceRenderPaddles();
  startCountdown(() => {
    startGame('multiplayer');
  });
}

export function handleInstructionsClick() {
  document.getElementById('instructionsModal').style.display = 'flex';
}

export function closeInstructions() {
  document.getElementById('instructionsModal').style.display = 'none';
}