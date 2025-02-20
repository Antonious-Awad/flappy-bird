const boardWidth = 360;
const boardHeight = 640;

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

/** @type {HTMLCanvasElement | null} */
let board;

/** @type {CanvasRenderingContext2D | null} */
let context;

document.addEventListener("keydown", handleKeyPress);

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
  x: boardWidth / 2 - 115.5 / 2, // button position x-axis
  y: boardHeight / 2 - 64 / 2, //button position y-axis
  width: 115.5,
  height: 64,
};

/** @type {CanvasItem} */
const logo = {
  x: boardWidth / 2 - 300 / 2, // logo position x-axis
  y: boardHeight / 4, //logo position y-axis
  width: 300,
  height: 100,
};

/** @type {CanvasItem} */
const bird = {
  x: 50,
  y: boardHeight / 2,
  width: 40,
  height: 30,
};

let velocityY = 0; // speed of bird
let velocityX = -2; // horizontal movement speed of pipes
const gravity = 0.5; // downward acceleration applied on bird
let birdY = boardHeight / 2; // Initial vertical position of bird
let pipeWidth = 50; // width of each pipe
let pipeGap = 200; // vertical gap between each top-bottom pipe

/** @type {CanvasItem[]} */
let pipeArray = [];
let pipeIntervalId;

function placePipes() {
  createPipe();
}

function createPipe() {
  let maxTopPipeHeight = boardHeight - pipeGap - 50; // ensuring that enough gap exists between pipes
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

// @ts-check

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d");

  requestAnimationFrame(update);
};

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

function renderMenu() {
  if (backgroundImage.complete)
    context.drawImage(backgroundImage, 0, 0, boardWidth, boardHeight);

  if (playButtonImg.complete)
    context.drawImage(
      playButtonImg,
      playButton.x,
      playButton.y,
      playButton.width,
      playButton.height
    );

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

function renderGame() {
  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    currentState = GAME_STATE.GAME_OVER;
  }

  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;

    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    if (detectedCollision(bird, pipe)) {
      currentState = GAME_STATE.GAME_OVER;
    }
  }

  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.textAlign = "left";
  context.fillText(score, 5, 45);
}

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

function handleKeyPress(e) {
  if (inputLocked) return;

  if (e.code === "Space") {
    if (currentState === GAME_STATE.MENU) {
      startGame();
    } else if (currentState === GAME_STATE.GAME_OVER) {
      resetGame();
      currentState = GAME_STATE.MENU;
    } else if (currentState === GAME_STATE.PLAYING) {
      velocityY = -6;
    }
  }
}

function startGame() {
  currentState = GAME_STATE.PLAYING;
  velocityY = 0;
  resetGame();

  if (pipeIntervalId) {
    clearInterval(pipeIntervalId);
  }

  pipeIntervalId = setInterval(placePipes, 1500);
}

function resetGame() {
  bird.y = birdY;
  pipeArray = [];
  score = 0;
}

function detectedCollision(bird, pipe) {
  return (
    bird.x < pipe.x + pipe.width &&
    bird.x + bird.width > pipe.x &&
    bird.y < pipe.y + pipe.height &&
    bird.y + bird.height > pipe.y
  );
}
