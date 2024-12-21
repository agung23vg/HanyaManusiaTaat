const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Responsiveness
canvas.width = Math.min(window.innerWidth - 20, 400); // Maksimal 400px
canvas.height = canvas.width;

const boxSize = 20; // Size of each grid box
let snake = [{ x: boxSize * 5, y: boxSize * 5 }]; // Initial snake position
let food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
};
let direction = "RIGHT"; // Initial direction
let score = 0;
let gameLoop;

// Event listener for keyboard controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Event listeners for touch controls
document.getElementById("up").addEventListener("click", () => {
    if (direction !== "DOWN") direction = "UP";
});
document.getElementById("down").addEventListener("click", () => {
    if (direction !== "UP") direction = "DOWN";
});
document.getElementById("left").addEventListener("click", () => {
    if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("right").addEventListener("click", () => {
    if (direction !== "LEFT") direction = "RIGHT";
});

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "black"; // Head is green, body is black
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    // Move snake
    const head = { ...snake[0] };
    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
        };
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }

    // Check collisions
    if (
        head.x < 0 || head.x >= canvas.width || 
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameLoop);
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
    }

    // Display score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function startGame() {
    gameLoop = setInterval(drawGame, 140);
}

startGame();
