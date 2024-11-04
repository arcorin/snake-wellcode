// functionality for the start button
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startGame);

const pauseBtn = document.getElementById("pause-btn");
pauseBtn.addEventListener("click", pauseGame);

// functionality for the stop button
const stopBtn = document.getElementById("stop-btn");
stopBtn.addEventListener("click", stopGame);

// define number of board cells and cells' dimenssions
const TOTAL_BLOCKS = 25;
const BLOCK_SIZE = 25;

// itialize canvas if the browser supports it
// else display explanatory message
const canvas = document.getElementById("gameBoard");

let ctx;
if (canvas.getContext) {
    ctx = canvas.getContext("2d"); 
} else {
    let para = "<p>Game not supported</p>";
    document.getElementById("board").innerHTML = para;
}

let gameOn = false;

let intervalID, newHeadPosition, stopConditions;

// the snake is initialized in the middle of the board when the game starts
let snake = [
    { x: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS), y: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS)},
    { x: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS) - 1, y: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS) },
    { x: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS) - 2, y: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS) },
    { x: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS) - 3, y: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS) },
    { x: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS) - 4, y: Math.floor((TOTAL_BLOCKS / 2) % TOTAL_BLOCKS) }
];

// when the game starts - the snake moves horizontaly, to the right
let dx = 1;
let dy = 0;

// add functionality: move the snake when pressing the arrow keys
document.addEventListener("keydown", keyPress);

function keyPress(e) {
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

// stop the game when:
// - the stop button is clicked or 
// - the snake hit the wall or itself
function stopGame() {
    // hide the stop button and display the start button
    stopBtn.classList.add("hidden");
    pauseBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");

    gameOn = false;

    // stop the main function - playGame()
    clearInterval(intervalID);

    // remove the filling of the game board
    ctx.clearRect(0, 0, TOTAL_BLOCKS * BLOCK_SIZE, TOTAL_BLOCKS * BLOCK_SIZE);


    snake.forEach( (coords) => {
        console.log("clear")
        ctx.clearRect(coords.x * BLOCK_SIZE, coords.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    });

}


function pauseGame() {
    // hide the stop button and display the start button
    stopBtn.classList.add("hidden");
    pauseBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");

    gameOn = false;

    // stop the main function - playGame()
    clearInterval(intervalID);
}

// start game when: 
// - the start button is clicked
function startGame() {
    // display board
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, TOTAL_BLOCKS * BLOCK_SIZE, TOTAL_BLOCKS * BLOCK_SIZE);
    
    // hide the start button and display the stop button
    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    stopBtn.classList.remove("hidden");

    // call the play function (main function)
    gameOn = true;
    intervalID = setInterval(playGame, 500); 
}


// main function - display & move the snake
function playGame() {
    if (gameOn) {
        console.log("hello");

        // (the snake moves by adding a new first element, and deleting the last element)
        // define the coordinates of the new first element (head) of the snake - where it will move next 
        newHeadPosition = { x: Math.abs((snake[0].x + dx) % TOTAL_BLOCKS), y: Math.abs((snake[0].y + dy) % TOTAL_BLOCKS) };
        
    
        // display the snake by filling each of its element
        ctx.fillStyle = "lightgreen";
        snake.forEach( (coords, index) => {

            // display each element of the snake
            console.log(`x: ${coords.x} y: ${coords.y}`)

            // define the stopping (game over) conditions:
            //  - the snake hits itself
            //  - the snake hits a wall
            stopConditions = newHeadPosition.x == (coords.x && newHeadPosition.y == coords.y && index != 0) || (coords.x == 0 || coords.x == 25) || (coords.y == 0 || coords.y == 25);
            
            // the game stops if one of the stopping conditions is met  
            if (stopConditions) {
                stopGame();
            } else if (!stopConditions) {
                // if none of the stop coditions is true, the snake is displayed and moves
                ctx.fillRect(coords.x * BLOCK_SIZE, coords.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            };
        });
        
        // move the snake by adding a new first element
        snake.unshift(newHeadPosition);

        // delete the last element of the snake 
        let tail = snake.pop();
        console.log(`tail x: ${tail.x} y: ${tail.y}`);

        // fill the last element of the snake with the color of the game board
        ctx.fillStyle = "black";
        ctx.fillRect(tail.x * BLOCK_SIZE, tail.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    
        
    } 
}




