import { ctx } from "../boardManager.js";
import { state } from "../gameState.js";
import { birdImage } from "../images.js";
import { detectedCollision } from "../collision.js";
import { GAME_SETTINGS } from "../constants.js";
import { endGame } from "../main.js";

export function renderGame() {
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
      state.score += 0.5;
      pipe.passed = true;
    }

    // Collision detection
    if (detectedCollision(state.bird, pipe)) {
      import("../main.js").then(({ endGame }) => endGame());
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
  ctx.fillText(Math.floor(state.score), 10, 50);
}
