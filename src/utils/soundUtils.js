export function playSound(soundPath) {
  try {
    const sound = new Audio(soundPath);
    sound.volume = 0.5;
    sound.play();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}