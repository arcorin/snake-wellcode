let gameBoard = document.getElementById("gameboard");
const ctx = gameBoard.getContext("2d");

const TOTAL_BLOCKS = 25;
const BLOCK_SIZE = 25;

let dx = 1, dy = 0;

// snake coordinates
let snake = [
    { x: Math.floor(TOTAL_BLOCKS / 2), y: Math.floor(TOTAL_BLOCKS / 2) },
    { x: Math.floor(TOTAL_BLOCKS / 2 - 1), y: Math.floor(TOTAL_BLOCKS / 2) },
    { x: Math.floor(TOTAL_BLOCKS / 2 - 2), y: Math.floor(TOTAL_BLOCKS / 2) },
    { x: Math.floor(TOTAL_BLOCKS / 2 - 3), y: Math.floor(TOTAL_BLOCKS / 2) },
    { x: Math.floor(TOTAL_BLOCKS / 2 - 4), y: Math.floor(TOTAL_BLOCKS / 2) }
];

let food = generateNewFoodPosition();
let interval = setInterval(moveGame, 500);
let gameOver = false;

function startGame() {}


// function for moving the snake
function moveGame() {
    // display board
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, TOTAL_BLOCKS * BLOCK_SIZE, TOTAL_BLOCKS * BLOCK_SIZE);
    
    // generate & display food
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x * BLOCK_SIZE, food.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    // display snake:
    snake.forEach( (coordinates, index) => {
        if (!gameOver) {
            // - display each element of the snake array
            ctx.fillStyle = "lightgreen";
            ctx.fillRect( coordinates.x * BLOCK_SIZE, coordinates.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            // if the snake intersect itself - stop game
            if (snake[0].x == coordinates.x && snake[0].y == coordinates.y && index != 0) {
                clearInterval(interval);
                printEndGameMessage();
                gameOver = true;
            }
        }
    });
    if (gameOver) {
        return;
    }
    
    // move snake by adding a new head
    let newHeadPosition = { 
        x: (snake[0].x + dx + TOTAL_BLOCKS) % TOTAL_BLOCKS, 
        y: (snake[0].y + dy + TOTAL_BLOCKS) % TOTAL_BLOCKS 
    };
    snake.unshift(newHeadPosition);

    // when moving:
    //  - when the snake doesn't find food - delete last element 
    //  - when the snake finds food - the last element remains (no action required)
    //          - new food is generated 
    if (!(food.x == snake[0].x && food.y == snake.y)) {
        snake.pop();
    } else {
        food = generateNewFoodPosition();
    }
}


document.addEventListener("keydown", keyPressed);

function keyPressed(e) {
    if (e.keyCode == 37) {
        dx = -1;
        dy = 0;
    } else if (e.keyCode == 38) {
        dx = 0;
        dy = -1;
    } else if (e.keyCode == 39) {
        dx = 1;
        dy = 0;
    } else if (e.keyCode == 40) {
        dx = 0;
        dy = 1;
    }
}


// function that generates food
function generateNewFoodPosition() {
    let isValidPosition, newFoodPosition;
    do {
        isValidPosition = true;
        newFoodPosition = {
            x: getRandomInt(TOTAL_BLOCKS),
            y: getRandomInt(TOTAL_BLOCKS)
        };
        // check that any position of snake does not intersect the new food position
        snake.forEach((coordinates, index) => {
            if (newFoodPosition.x == coordinates.x && newFoodPosition.y == coordinates.y) {
                isValidPosition = false;
            }
        });
    } while (!isValidPosition);
    return newFoodPosition;    
}


// generate random numbers for generating new food position
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function printEndGameMessage() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, TOTAL_BLOCKS * BLOCK_SIZE, TOTAL_BLOCKS * BLOCK_SIZE);
    
    document.body.innerHTML = "<h1 style='text-align: center'>GAME OVER</h1>" + 
    "<button type='button' name='button' onclick='startGame()'>RESET GAME</button>";

}

function startGame() {
    document.body.innerHTML = "<canvas id='gameboard' width='625px' height='625px'"
    gameBoard = document.getElementById("gameboard");
    ctx = gameBoard.getContext("2d");

    dx = 1;
    dy = 0;
    let snake = [
        { x: Math.floor(TOTAL_BLOCKS / 2), y: Math.floor(TOTAL_BLOCKS / 2) },
        { x: Math.floor(TOTAL_BLOCKS / 2 - 1), y: Math.floor(TOTAL_BLOCKS / 2) },
        { x: Math.floor(TOTAL_BLOCKS / 2 - 2), y: Math.floor(TOTAL_BLOCKS / 2) },
        { x: Math.floor(TOTAL_BLOCKS / 2 - 3), y: Math.floor(TOTAL_BLOCKS / 2) },
        { x: Math.floor(TOTAL_BLOCKS / 2 - 4), y: Math.floor(TOTAL_BLOCKS / 2) }
    ];
    food = generateNewFoodPosition();
    gameOver = false;
    interval = setInterval(moveGame, 500);
}



