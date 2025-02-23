import { ctx, backgroundPattern, canvas } from "../boardManager.js";
import { state } from "../gameState.js";
import { birdImage } from "../images.js";
import { detectedCollision } from "../collision.js";
import { GAME_SETTINGS } from "../constants.js";
import { endGame } from "../main.js";

export function renderGame() {
  if (backgroundPattern) {
    ctx.fillStyle = backgroundPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  // Update bird physics
  state.velocityY += GAME_SETTINGS.GRAVITY;
  state.bird.y = Math.max(state.bird.y + state.velocityY, 0);

  // Add bottom boundary check
  if (state.bird.y + state.bird.height > state.boardHeight) {
    endGame();
  }

  // Draw bird
  ctx.drawImage(
    birdImage,
    state.bird.x,
    state.bird.y,
    state.bird.width,
    state.bird.height
  );

  // Process pipes
  state.pipes.forEach((pipe) => {
    pipe.x -= GAME_SETTINGS.INITIAL_VELOCITY_X;
    ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    // Score logic
    if (!pipe.passed && state.bird.x > pipe.x + pipe.width) {
      GAME_SETTINGS.INITIAL_VELOCITY_X *= 1.05;
      state.score += 0.5;
      pipe.passed = true;
    }

    // Collision detection
    if (detectedCollision(state.bird, pipe)) {
      endGame();
    }
  });

  // Cleanup off-screen pipes
  while (
    state.pipes.length > 0 &&
    state.pipes[0].x < -GAME_SETTINGS.PIPE_WIDTH
  ) {
    state.pipes.shift();
  }

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "45px sans-serif";
  ctx.fillText(Math.floor(state.score), 20, 50);
}
