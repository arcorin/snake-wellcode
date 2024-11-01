const TOTAL_BLOCKS = 25;
const BLOCK_SIZE = 25;

let gameBoard = document.getElementById("gameboard");
const ctx = gameBoard.getContext("2d");

// add functionalities to buttons
const btnStart = document.getElementById("start-btn");
btnStart.addEventListener("click", playGame);

const btnStop = document.getElementById("stop-btn");

const btnReset= document.getElementById("reset-btn");



let snake, food, dx, dy, interval, newHeadPosition;

// add a function that allows to move the snake with keyboard arrows
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



// function that displays the board + snake + food
function displayBoard() {
    

    // display board
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, TOTAL_BLOCKS * BLOCK_SIZE, TOTAL_BLOCKS * BLOCK_SIZE);
    
    // display snake
    snake = [
        { x: Math.floor(TOTAL_BLOCKS / 2), y: Math.floor(TOTAL_BLOCKS / 2) },
        { x: Math.floor(TOTAL_BLOCKS / 2 - 1), y: Math.floor(TOTAL_BLOCKS / 2) },
        { x: Math.floor(TOTAL_BLOCKS / 2 - 2), y: Math.floor(TOTAL_BLOCKS / 2) },
        { x: Math.floor(TOTAL_BLOCKS / 2 - 3), y: Math.floor(TOTAL_BLOCKS / 2) },
        { x: Math.floor(TOTAL_BLOCKS / 2 - 4), y: Math.floor(TOTAL_BLOCKS / 2) }
    ];

}


function moveSnake() {

    snake.forEach( (coord, index) => {

        // - display each element of the snake array
        ctx.fillStyle = "lightgreen";
        ctx.fillRect( coord.x * BLOCK_SIZE, coord.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        
        // when the snake intersect itself - stop game
        if (index != 0 && snake[0].x == coord.x && snake[0].y == coord.y) {
            ctx.clearRect(coord.x * BLOCK_SIZE, coord.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
            stopGame();
            }
        
    });

    // move the snake by adding a new head
    let newHeadPosition = { 
        x: (snake[0].x + dx + TOTAL_BLOCKS) % TOTAL_BLOCKS, 
        y: (snake[0].y + dy + TOTAL_BLOCKS) % TOTAL_BLOCKS 
    };
    snake.unshift(newHeadPosition);
    snake.pop();
}


function stopGame() {
    clearInterval(interval);

    ctx.clearRect(0, 0, TOTAL_BLOCKS * BLOCK_SIZE, TOTAL_BLOCKS * BLOCK_SIZE);

    btnStart.classList.remove("hidden");
    btnStop.classList.add("hidden");
    btnReset.classList.add("hidden");

}




function playGame() {
    console.log("start game");

    // display stop button & hide play button
    btnStart.classList.add("hidden");
    btnStop.classList.remove("hidden");

    dx = 1;
    dy = 0;

    // display the board
    displayBoard(); 


    // display & move the snake
    interval = setInterval(moveSnake, 500);
    

  


}
