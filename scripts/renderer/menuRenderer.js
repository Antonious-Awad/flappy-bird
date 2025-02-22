import { ctx } from "../boardManager.js";
import { state } from "../gameState.js";
import { playButtonImg, logoImg, backgroundImage } from "../images.js";

let backgroundPattern;

export function renderMenu() {
  // Draw background
  if (!backgroundPattern) {
    backgroundPattern = ctx.createPattern(backgroundImage, "repeat");
  }
  ctx.fillStyle = backgroundPattern;
  ctx.fillRect(0, 0, state.boardWidth, state.boardHeight);

  // Draw logo
  const logoScale = 300 / logoImg.width;
  ctx.drawImage(
    logoImg,
    state.boardWidth / 2 - 150,
    state.boardHeight / 4,
    300,
    logoImg.height * logoScale
  );

  const playButtonWidth = 115.5;
  const playButtonHeight = 64;
  const btnX = state.boardWidth / 2 - playButtonWidth / 2;
  const btnY = state.boardHeight / 2 - playButtonHeight / 2;

  ctx.drawImage(playButtonImg, btnX, btnY, playButtonWidth, playButtonHeight);
}
