export const GAME_STATE = {
  MENU: "menu",
  PLAYING: "playing",
  GAME_OVER: "gameOver",
};

console.log(window.innerWidth);
export const GAME_SETTINGS = {
  GRAVITY: 0.3,
  INITIAL_VELOCITY_X: 3,
  FLAP_FORCE: -6,
  PIPE_GAP: 200,
  PIPE_WIDTH: 50,
  BIRD_WIDTH: 40,
  BIRD_HEIGHT: 30,
  PIPE_INTERVAL:
    window.innerWidth < 640 ? 2500 : window.innerWidth < 1024 ? 3000 : 3500,
};
