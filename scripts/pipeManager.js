import { state } from "./gameState.js";
import { GAME_SETTINGS } from "./constants.js";
import { topPipeImg, bottomPipeImg } from "./images.js";

let pipeInterval = null;

export function startPipes() {
  // Full cleanup before starting new pipes
  if (pipeInterval) {
    clearInterval(pipeInterval);
    pipeInterval = null;
  }
  state.pipes = [];
  pipeInterval = setInterval(createPipePair, GAME_SETTINGS.PIPE_INTERVAL);
}

export function stopPipes() {
  if (pipeInterval) {
    clearInterval(pipeInterval);
    pipeInterval = null;
  }
  state.pipes = [];
}

function createPipePair() {
  const maxTopHeight = state.boardHeight - GAME_SETTINGS.PIPE_GAP - 50;
  const topHeight = Math.floor(Math.random() * maxTopHeight);

  state.pipes.push(
    {
      x: state.boardWidth,
      y: 0,
      width: GAME_SETTINGS.PIPE_WIDTH,
      height: topHeight,
      img: topPipeImg,
      passed: false,
    },
    {
      x: state.boardWidth,
      y: topHeight + GAME_SETTINGS.PIPE_GAP,
      width: GAME_SETTINGS.PIPE_WIDTH,
      height: state.boardHeight - topHeight - GAME_SETTINGS.PIPE_GAP,
      img: bottomPipeImg,
      passed: false,
    }
  );
}
