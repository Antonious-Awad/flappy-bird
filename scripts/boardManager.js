import { state } from "./gameState.js";
import { GAME_STATE } from "./constants.js";

export let canvas, ctx;

export function initializeBoard() {
  canvas = document.getElementById("board");
  ctx = canvas.getContext("2d");
  resizeBoard();
}

export function resizeBoard() {
  state.boardWidth = window.innerWidth;
  state.boardHeight = window.innerHeight;
  canvas.width = state.boardWidth;
  canvas.height = state.boardHeight;

  if (state.current !== GAME_STATE.PLAYING) {
    state.bird.y = state.boardHeight / 2;
  }
}
