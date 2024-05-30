
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let ironman = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 30,
    speed: 5,
    dx: 0,
    dy: 0
};

let score = 0;

let gameOver = false;

function drawIronman() {
    ctx.beginPath();
    ctx.arc(ironman.x, ironman.y, ironman.size, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function updateIronman() {
    ironman.x += ironman.dx;
    ironman.y += ironman.dy;

    if (ironman.x - ironman.size < 0) ironman.x = ironman.size;
    if (ironman.y - ironman.size < 0) ironman.y = ironman.size;
    if (ironman.x > canvas.width - ironman.size) ironman.x = canvas.width - ironman.size;
    if (ironman.y > canvas.height - ironman.size) ironman.y = canvas.height - ironman.size;

    console.log(ironman.x, ironman.y)
}

function gameLoop(currentTime) {
    if (gameOver) {
        return;
    }

    // Calculate the time elapsed since the last frame
    const deltaTime = currentTime - lastTime;

    // Update the last time
    lastTime = currentTime;

    // Update: Here we will update the game's state based on the elapsed time
    updateIronman();

    // Draw: Here we will render the game's state to the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawIronman();

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

let lastTime = 0;

// Start the game loop
requestAnimationFrame(gameLoop);

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            ironman.dy = -ironman.speed;
            break;
        case 'ArrowDown':
            ironman.dy = ironman.speed;
            break;
        case 'ArrowLeft':
            ironman.dx = -ironman.speed;
            break;
        case 'ArrowRight':
            ironman.dx = ironman.speed;
            break;
    }
});

window.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            ironman.dy = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            ironman.dx = 0;
            break;
    }
});
