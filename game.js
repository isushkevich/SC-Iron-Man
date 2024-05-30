let canvas = document.getElementById("gameCanvas");
canvas.style.backgroundColor = 'linen';
let ctx = canvas.getContext("2d");

let ironman = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 30,
  speed: 5,
  dx: 0,
  dy: 0,
};

let score = 0;

let gameOver = false;

function drawIronman() {
  ctx.beginPath();
  ctx.arc(ironman.x, ironman.y, ironman.size, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function updateIronman() {
  ironman.x += ironman.dx;
  ironman.y += ironman.dy;

  if (ironman.x - ironman.size < 0) ironman.x = ironman.size;
  if (ironman.y - ironman.size < 0) ironman.y = ironman.size;
  if (ironman.x > canvas.width - ironman.size)
    ironman.x = canvas.width - ironman.size;
  if (ironman.y > canvas.height - ironman.size)
    ironman.y = canvas.height - ironman.size;
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
  updateDrones();

  // Draw: Here we will render the game's state to the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawIronman();
  drawDrones();

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

let lastTime = 0;

// Start the game loop
requestAnimationFrame(gameLoop);

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      ironman.dy = -ironman.speed;
      break;
    case "ArrowDown":
      ironman.dy = ironman.speed;
      break;
    case "ArrowLeft":
      ironman.dx = -ironman.speed;
      break;
    case "ArrowRight":
      ironman.dx = ironman.speed;
      break;
  }
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowUp":
    case "ArrowDown":
      ironman.dy = 0;
      break;
    case "ArrowLeft":
    case "ArrowRight":
      ironman.dx = 0;
      break;
  }
});

/////////////////////////////////////////////////////////////////////////

let drones = [];

function spawnDrone() {
  // Spawn a drone at a random y position on the right side of the screen
  let drone = {
    x: canvas.width,
    y: Math.random() * canvas.height,
    size: 10,
    speed: 3,
  };

  drones.push(drone);
}

for (let i = 0; i < 10; i++) {
  setTimeout(() => spawnDrone(), 700 * i);
}

function drawDrones() {
  for (let drone of drones) {
    ctx.beginPath();
    ctx.arc(drone.x, drone.y, drone.size, 0, Math.PI * 2);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
  }
}

function updateDrones() {
  for (let i = 0; i < drones.length; i++) {
    let drone = drones[i];

    // Move the drone to the left
    drone.x -= drone.speed;

    // Remove the drone if it has moved off the screen
    if (drone.x + drone.size < 0) {
      drones.splice(i, 1);
      i--;
      spawnDrone();
    }
  }
}

// setInterval(() => {
//     updateDrones();
// }, 1000);

// function gameLoop(currentTime) {
//     // ...

//     if (gameOver) {
//         // Draw the game over screen
//         ctx.font = '30px Arial';
//         ctx.fillStyle = 'black';
//         ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
//         ctx.fillStyle = 'white';
//         ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
//         ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 50);
//         ctx.fillText('Press Enter to Restart', canvas.width / 2 - 150, canvas.height / 2 + 100);

//         // Restart the game if the player presses Enter
//         if (event.key === 'Enter') {
//             location.reload(); // Reload the page to restart the game
//         }

//         return;
//     }

//     // ...
// }
