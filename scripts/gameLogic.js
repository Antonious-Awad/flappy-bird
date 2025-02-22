import { state } from "./gameState.js";
import { GAME_SETTINGS, GAME_STATE } from "./constants.js";
import { startGame } from "./main.js";

export function handleGameAction() {
  if (state.inputLocked) return;

  switch (state.current) {
    case GAME_STATE.MENU:
      startGame();
      break;

    case GAME_STATE.PLAYING:
      state.velocityY = GAME_SETTINGS.FLAP_FORCE;
      break;

    case GAME_STATE.GAME_OVER:
      resetGame();
      break;
  }
}

function resetGame() {
  // Completely reset all game state
  state.current = GAME_STATE.MENU;
  state.score = 0;
  state.pipes = [];
  state.bird.y = state.boardHeight / 2;
  state.velocityY = 0;
  state.inputLocked = false;
}
