import { GAME_STATE } from "./constants.js";

export const state = {
  current: GAME_STATE.MENU,
  bird: {
    x: 50,
    y: window.innerHeight / 2,
    width: 40,
    height: 30,
  },
  pipes: [],
  score: 0,
  velocityY: 0,
  inputLocked: false,
  boardWidth: window.innerWidth,
  boardHeight: window.innerHeight,
};
