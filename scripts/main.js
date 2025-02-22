// Full-screen dimensions
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;

// images
const backgroundImage = new Image();
backgroundImage.src = "./images/flappybirdbg.png";

const birdImage = new Image();
birdImage.src = "./images/flappybird.png";

const topPipeImg = new Image();
topPipeImg.src = "./images/toppipe.png";

const bottomPipeImg = new Image();
bottomPipeImg.src = "./images/bottompipe.png";

const playButtonImg = new Image();
playButtonImg.src = "./images/flappyBirdPlayButton.png";

const flappyBirdTextImage = new Image();
flappyBirdTextImage.src = "./images/flappyBirdLogo.png";

const gameOverImg = new Image();
gameOverImg.src = "./images/flappy-gameover.png";

let inputLocked = false;
let backgroundPattern;
let birdY = boardHeight / 2; // Initial bird Y position

/** @type {HTMLCanvasElement | null} */
let board;

/** @type {CanvasRenderingContext2D | null} */
let context;

document.addEventListener("keydown", handleKeyPress);
document.addEventListener("click", handleClick);
document.addEventListener("touchstart", handleClick);

const GAME_STATE = {
  MENU: "menu",
  PLAYING: "playing",
  GAME_OVER: "gameOver",
};

let currentState = GAME_STATE.MENU;

/**
 * @typedef {Object} CanvasItem
 * @property {number} x - x-axis position.
 * @property {number} y - y-axis position.
 * @property {number} width - width of item.
 * @property {number} height - height of item.
 * @property {boolean} passed - (for pipes) if pipe is passed.
 * @property {HTMLImageElement} img - image of pipe.
 */

/** @type {CanvasItem} */
const playButton = {
  width: 115.5,
  height: 64,
  get x() {
    return boardWidth / 2 - this.width / 2;
  },
  get y() {
    return boardHeight / 2 - this.height / 2;
  },
};

/** @type {CanvasItem} */
const logo = {
  width: 300,
  height: 100,
  get x() {
    return boardWidth / 2 - this.width / 2;
  },
  get y() {
    return boardHeight / 4;
  },
};

/** @type {CanvasItem} */
const bird = {
  x: 50,
  width: 40,
  height: 30,
  y: boardHeight / 2, // Initial bird position
};

let velocityY = 0;
let velocityX = 2;
const gravity = 0.5;
let pipeWidth = 50;
let pipeGap = 200;
let score = 0;

/** @type {CanvasItem[]} */
let pipeArray = [];
let pipeIntervalId;

// Resize handler
function resizeBoard() {
  boardWidth = window.innerWidth;
  boardHeight = window.innerHeight;
  board.width = boardWidth;
  board.height = boardHeight;

  // Update birdY and reset bird position
  birdY = boardHeight / 2;
  if (currentState !== GAME_STATE.PLAYING) {
    bird.y = birdY;
  }
}

// Initialize the game
window.onload = function () {
  board = document.getElementById("board");
  context = board.getContext("2d");

  // Create background pattern
  backgroundImage.onload = () => {
    backgroundPattern = context.createPattern(backgroundImage, "repeat");
  };

  // Set up initial dimensions and resize listener
  resizeBoard();
  window.addEventListener("resize", resizeBoard);
  requestAnimationFrame(update);
};

// Main game loop
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  if (currentState === GAME_STATE.MENU) {
    renderMenu();
  } else if (currentState === GAME_STATE.PLAYING) {
    renderGame();
  } else {
    renderGameOver();
  }
}

// Render the main menu
function renderMenu() {
  // Draw repeating background pattern
  if (backgroundPattern) {
    context.fillStyle = backgroundPattern;
    context.fillRect(0, 0, boardWidth, boardHeight);
  }

  // Draw play button
  if (playButtonImg.complete) {
    context.drawImage(
      playButtonImg,
      playButton.x,
      playButton.y,
      playButton.width,
      playButton.height
    );
  }

  // Draw logo
  if (flappyBirdTextImage.complete) {
    const scaledWidth = logo.width;
    const scaledHeight =
      (flappyBirdTextImage.height / flappyBirdTextImage.width) * scaledWidth;
    context.drawImage(
      flappyBirdTextImage,
      logo.x,
      logo.y,
      scaledWidth,
      scaledHeight
    );
  }
}

// Render the game
function renderGame() {
  // Apply gravity to the bird
  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  // Check if bird falls off the screen
  if (bird.y > board.height) {
    currentState = GAME_STATE.GAME_OVER;
  }

  // Update and draw pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    // Check if bird passes a pipe
    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    // Check for collisions
    if (detectedCollision(bird, pipe)) {
      currentState = GAME_STATE.GAME_OVER;
    }
  }

  // Remove off-screen pipes
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  // Draw score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.textAlign = "left";
  context.fillText(score, 5, 45);
}

// Render game over screen
function renderGameOver() {
  if (gameOverImg.complete) {
    let imgWidth = 400;
    let imgHeight = 80;
    let x = (boardWidth - imgWidth) / 2;
    let y = boardHeight / 3;

    context.drawImage(gameOverImg, x, y, imgWidth, imgHeight);

    let scoreText = `Your score: ${Math.floor(score)}`;
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.textAlign = "center";
    context.fillText(scoreText, boardWidth / 2, y + imgHeight + 50);

    inputLocked = true;
    setTimeout(() => {
      inputLocked = false;
    }, 1000);
  }
}

// Handle game play actions
function handleGamePlay() {
  if (currentState === GAME_STATE.MENU) {
    startGame();
  } else if (currentState === GAME_STATE.GAME_OVER) {
    resetGame();
    currentState = GAME_STATE.MENU;
  } else if (currentState === GAME_STATE.PLAYING) {
    velocityY = -6; // Make the bird flap
  }
}

// Handle click/touch events
function handleClick(e) {
  if (inputLocked) return;
  if (e.type === "touchstart") e.preventDefault();
  handleGamePlay();
}

// Handle key press events
function handleKeyPress(e) {
  if (inputLocked) return;
  if (e.code === "Space") {
    handleGamePlay();
  }
}

// Start the game
function startGame() {
  currentState = GAME_STATE.PLAYING;
  velocityY = 0;
  resetGame();

  if (pipeIntervalId) {
    clearInterval(pipeIntervalId);
  }

  // Increased interval for more spacing between pipes
  pipeIntervalId = setInterval(placePipes, 2500);
}

// Reset the game state
function resetGame() {
  bird.y = birdY; // Reset bird position
  pipeArray = [];
  score = 0;
}

// Create new pipes
function createPipe() {
  let maxTopPipeHeight = boardHeight - pipeGap - 50;
  let topPipeHeight = Math.floor(Math.random() * maxTopPipeHeight);
  let bottomPipeHeight = boardHeight - topPipeHeight - pipeGap;

  /** @type {CanvasItem & {passed: boolean}} */
  let topPipe = {
    x: boardWidth,
    y: 0,
    width: pipeWidth,
    height: topPipeHeight,
    img: topPipeImg,
    passed: false,
  };

  let bottomPipe = {
    x: boardWidth,
    y: topPipeHeight + pipeGap,
    width: pipeWidth,
    height: bottomPipeHeight,
    img: bottomPipeImg,
    passed: false,
  };

  pipeArray.push(topPipe, bottomPipe);
}

// Place pipes at intervals
function placePipes() {
  createPipe();
}

// Detect collisions between bird and pipes
function detectedCollision(bird, pipe) {
  return (
    bird.x < pipe.x + pipe.width &&
    bird.x + bird.width > pipe.x &&
    bird.y < pipe.y + pipe.height &&
    bird.y + bird.height > pipe.y
  );
}
