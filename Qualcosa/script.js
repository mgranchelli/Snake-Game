const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let dx = 5, dy = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

let paddleLength = 5;
let yDirection = false;

let y = 19;


let initialX = 20
let initialY = 10

//let paddle;


let leftPressed = false;
let rightPressed = false;

// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    // Passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = e => {
    // Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
function createRect(initialX) {
    let paddle = ''
    for (let i = 0; i < paddleLength; i++) {
        paddle += `<div class="head" style="grid-area: 27 / ${i+initialX}"></div>`;
    }
    return paddle
}

function getY() {
    return 1*Math.sign(dy)
}

function createFood() {
    // //dy += 0.5*Math.sign(dy);
    // // If ball is at right or left edge reverse x direciton
    // if (x+dx < 0 || x+dx > 30 - 1) {
    //     dx = -dx;
    // }

    // If ball is at top edge reverse y direction
    if (y < 1) {
        yDirection = true
    }

    if (y > 29) {
        yDirection = false
    }

    if (yDirection) {
        y += 4*Math.sign(dy);
        console.log(y)
    }
    else {
        y -= 4*Math.sign(dy);
    }

    // // If ball hits paddle reverse y direction
    // // If ball hits bottom edge end
    // else if (y+dy > canvas_height-3*ball_size ) {
    //     if (x > paddleX-ball_size && x < paddleX + paddle_width + ball_size) {
    //         dy = -dy;
    //         score++;
    //         if (score%5 === 0) {
    //             level += 1;
    //             dy += 0.5*Math.sign(dy);
    //             dx += 0.5*Math.sign(dx);
    //         }
    //     }

    //     else {
    //         drawGameOver();
    //         play_button.disabled = false;
    //         return;
    //     }
    // }
    
    //dx -= 1*Math.sign(dx);
    //y += 1*Math.sign(dy);
    //console.log(2*Math.sign(5))
    return `<div class="food" style="grid-area: ${y} / ${dx}"></div>`;
}

// Keep track of which key is pressed
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
        leftPressed = false;
    }

    if (e.key === "Left" || e.key === "ArrowLeft") {
        rightPressed = false;
        leftPressed = true;
    }
}

// Clear which key is pressed
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }

    if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    //let html = `<div class="food" style="grid-area: 10 / 10"></div>`;
    let html = createFood()

    // // Checking if the snake hit the food
    // if(snakeX === foodX && snakeY === foodY) {
    //     updateFoodPosition();
    //     snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
    //     score++; // increment score by 1
    //     highScore = score >= highScore ? score : highScore;
    //     localStorage.setItem("high-score", highScore);
    //     scoreElement.innerText = `Score: ${score}`;
    //     highScoreElement.innerText = `High Score: ${highScore}`;
    // }
    // // Updating the snake's head position based on the current velocity
    // snakeX += velocityX;
    // snakeY += velocityY;
    
    // // Shifting forward the values of the elements in the snake body by one
    // for (let i = snakeBody.length - 1; i > 0; i--) {
    //     snakeBody[i] = snakeBody[i - 1];
    // }
    // snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // // Checking if the snake's head is out of wall, if so setting gameOver to true
    // if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    //     return gameOver = true;
    // }

    // for (let i = 0; i < snakeBody.length; i++) {
    //     // Adding a div for each part of the snake's body
    //     html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    //     // Checking if the snake head hit the body, if so set gameOver to true
    //     if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
    //         gameOver = true;
    //     }
    // }

    if (rightPressed) {
        if (initialX + paddleLength < 31) {
            initialX += 1;
        }
    }
    if (leftPressed) {
        if (initialX - 1 > 0) {
            initialX -= 1;
        }
    }

    html += createRect(initialX);
    
    
    playBoard.innerHTML = html
}

//updateFoodPosition();

//createFood()
setIntervalId = setInterval(initGame, 100);
//document.addEventListener("keyup", changeDirection);