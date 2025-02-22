import { state } from "./gameState.js";
import { handleGameAction } from "./gameLogic.js";

let listenersInitialized = false;

export function initializeInput() {
  if (listenersInitialized) return;

  const handler = (e) => {
    if (e.type === "touchstart") e.preventDefault();
    if (!state.inputLocked) handleGameAction();
  };

  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("click", handler);
  document.addEventListener("touchstart", handler);

  listenersInitialized = true;
}

function handleKeyPress(e) {
  if (!state.inputLocked && e.code === "Space") {
    handleGameAction();
  }
}
