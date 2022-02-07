const canva = document.getElementById("canva");
const ctx = canva.getContext("2d");
canva.height = window.innerHeight;
canva.width = window.innerWidth;
let x = canva.width / 2;
let y = canva.height - 30;
let dx = 2;
let dy = -2;

const radiusBall = 20;
ctx.fillStyle = "red";
let colors = [];
let rightPressed = false;
let leftPressed = false;
let checkIN = 0;
/////размеры платфоримы
const shipHeight = 10;
const shipWidth = 100;
let sheepStartPosition = (canva.width - shipWidth) / 2;


/////////////создаю кирпичи
const blockRow = 7;
const blockColl = 17;
const bloskHeight = 20;
const blockWidth = 75;
const blockPadding = 10;
const blockMoveTop = 30;
const blockMoveLeft = 30;

// отрисовка поля
let block = [];
for (let col = 0; col < blockColl; col++) {
  block[col] = [];
  for (let row = 0; row < blockRow; row++) {
    block[col][row] = { x: 0, y: 0, status: 1 };
  }
}


while (colors.length < 100) {
  // засунуть в функцию
  do {
    let color = Math.floor(Math.random() * 1000000 + 1);
  } while (colors.indexOf(Math.floor(Math.random() * 1000000 + 1)) >= 0);
  colors.push(
    "#" +
      ("000000" + Math.floor(Math.random() * 1000000 + 1).toString(16)).slice(
        -6
      )
  );
}

function draw() {
  ctx.clearRect(0, 0, canva.width, canva.height);
  drawBlock();

  ballDraw();
  drawShip();
  collision();
  check();
  x += dx;
  y += dy;
  if (x + dx > canva.width - radiusBall || x + dx < radiusBall) {
    dx = -dx;
  }

  if (y + dy < radiusBall) {
    dy = -dy;
  } else if (y + dy > canva.height - radiusBall) {
    if (x > sheepStartPosition && x < sheepStartPosition + shipWidth) {
      dy = -dy;
    } else {
      alert("Проиграл");
      document.location.reload();
      clearInterval(interval);
    }
  }

  if (rightPressed && sheepStartPosition < canva.width - shipWidth) {
    sheepStartPosition += 7;
  } else if (leftPressed && sheepStartPosition > 0) {
    sheepStartPosition -= 7;
  }
}
function check() {
  ctx.font = "22px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Check: " + checkIN, 10, 30);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMove, false);

function mouseMove(e) {
  var relativeX = e.clientX - canva.offsetLeft;
  if (relativeX > 0 && relativeX < canva.width) {
    sheepStartPosition = relativeX - shipWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  }
  if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function collision() {
  for (var col = 0; col < blockColl; col++) {
    for (var row = 0; row < blockRow; row++) {
      var b = block[col][row];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + blockWidth &&
          y > b.y &&
          y < b.y + bloskHeight
        ) {
          dy = -dy;
          b.status = 0;
          checkIN++;
          if (checkIN == blockRow * blockColl) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

let interval = setInterval(draw, 10);
