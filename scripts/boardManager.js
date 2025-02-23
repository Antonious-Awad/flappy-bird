import { state } from "./gameState.js";
import { backgroundImage } from "./images.js";

export let canvas, ctx;

export function initializeBoard() {
  canvas = document.getElementById("board");
  ctx = canvas.getContext("2d");
  resizeBoard();
}

export let backgroundPattern = null;

export function createBackgroundPattern() {
  if (!backgroundImage.complete) return;

  // Create temporary canvas for pattern generation
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");

  // Set pattern dimensions to match image width and current screen height
  patternCanvas.width = backgroundImage.naturalWidth;
  patternCanvas.height = canvas?.height;

  // Stretch image vertically to fill current screen height
  patternCtx.drawImage(
    backgroundImage,
    0,
    0,
    backgroundImage.naturalWidth,
    backgroundImage.naturalHeight,
    0,
    0,
    patternCanvas.width,
    patternCanvas.height
  );

  // Create horizontal-only repeating pattern
  backgroundPattern = ctx?.createPattern(patternCanvas, "repeat-x");
}

// Update resize handler
export function resizeBoard() {
  state.boardWidth = window.innerWidth;
  state.boardHeight = window.innerHeight;
  canvas.width = state.boardWidth;
  canvas.height = state.boardHeight;

  // Regenerate pattern on resize
  if (backgroundImage.complete) {
    createBackgroundPattern();
  }
}

// Initialize pattern after image loads
backgroundImage.onload = () => {
  createBackgroundPattern();
};
