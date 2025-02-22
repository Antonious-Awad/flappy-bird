import { ctx } from "../boardManager.js";
import { state } from "../gameState.js";
import { gameOverImg } from "../images.js";

export function renderGameOver() {
  const imgWidth = 400;
  const imgHeight = 80;
  const x = (state.boardWidth - imgWidth) / 2;
  const y = state.boardHeight / 3;

  // Game Over text
  ctx.drawImage(gameOverImg, x, y, imgWidth, imgHeight);

  // Final score
  const scoreText = `Your score: ${Math.floor(state.score)}`;
  ctx.fillStyle = "white";
  ctx.font = "45px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(scoreText, state.boardWidth / 2, y + imgHeight + 50);
}
