import { GAME_STATE } from "./constants.js";
import { state } from "./gameState.js";
import { initializeBoard, resizeBoard, canvas, ctx } from "./boardManager.js";
import { initializeInput } from "./inputHandler.js";
import { startPipes, stopPipes } from "./pipeManager.js";
import { renderMenu } from "./renderer/menuRenderer.js";
import { renderGame } from "./renderer/gameRenderer.js";
import { renderGameOver } from "./renderer/gameOverRenderer.js";

// Initialize game
window.onload = () => {
  initializeBoard();
  initializeInput();
  window.addEventListener("resize", resizeBoard);
  requestAnimationFrame(gameLoop);
};

// Main game loop
function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (state.current) {
    case GAME_STATE.MENU:
      renderMenu();
      break;
    case GAME_STATE.PLAYING:
      renderGame();
      break;
    case GAME_STATE.GAME_OVER:
      renderGameOver();
      break;
  }
}

// Game state management
export function startGame() {
  // Full game reset
  state.current = GAME_STATE.PLAYING;
  state.score = 0;
  state.pipes = [];
  state.bird.y = state.boardHeight / 2;
  state.velocityY = 0;
  state.inputLocked = false;

  // Force pipe system reset
  startPipes();
}

// Modify endGame function
export function endGame() {
  state.current = GAME_STATE.GAME_OVER;
  stopPipes();
  state.inputLocked = true;

  state.pipes = [];

  setTimeout(() => {
    state.inputLocked = false;
  }, 1000);
}
