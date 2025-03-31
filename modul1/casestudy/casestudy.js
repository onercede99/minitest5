let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");

let backgroundImage = new Image();
backgroundImage.src = "backgroundnen.png";
let beerBottleImage = new Image();
beerBottleImage.src = "beerbottle.png";
let beerBoxImage = new Image();
beerBoxImage.src = "beerbox.png";

let backgroundImageLoaded = false;
let beerBottleImageLoaded = false;
let beerBoxImageLoaded = false;

let Box = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 80,
    width: 80,
    height: 60,
    speed: 3
};
let beerBottle = [];
let countBeer = 0;
let missedBeer = 0;
let gameOver = false;
let gameStarted = false;

let leftPressed = false;
let rightPressed = false;
function handlekeyPress() {
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") {
            leftPressed = true;
        } else if (e.key === "ArrowRight") {
            rightPressed = true;
        }
    });
    document.addEventListener("keyup", function(e) {
        if (e.key === "ArrowLeft") {
            leftPressed = false;
        } else if (e.key === "ArrowRight") {
            rightPressed = false;
        }
    });
}

function createBeerBottle() {
    let bottle = {
        x: Math.random() * (canvas.width - 30),
        y: -50,
        width: 50,
        height: 75,
        speed: 1
    };
    beerBottle.push(bottle);
}
function drawBackGround() {
    if (backgroundImageLoaded) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function drawBeerBox() {
    if (beerBoxImageLoaded) {
        ctx.drawImage(beerBoxImage, Box.x, Box.y, Box.width, Box.height);
    } else {
        ctx.fillStyle = "blue";
        ctx.fillRect(Box.x, Box.y, Box.width, Box.height);
    }
}
function drawBeerBottle() {
    for (let i = 0; i < beerBottle.length; i++) {
        let bottle = beerBottle[i];
        if (beerBottleImageLoaded) {
            ctx.drawImage(beerBottleImage, bottle.x, bottle.y, bottle.width, bottle.height);
        } else {
            ctx.fillStyle = "brown";
            ctx.fillRect(bottle.x, bottle.y, bottle.width, bottle.height);
        }
    }
}
function drawGame() {
    ctx.fillStyle = "black";
    ctx.font = "25px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + countBeer, 10, 30);
    ctx.fillText("Missed: " + missedBeer + "/3", 10, 60);
}
function drawStartGame() {
    ctx.fillStyle = "black";
    ctx.font = "35px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Nhấn StartGame để chơi", canvas.width / 2, canvas.height / 2);
}
function drawLoseGame() {
    ctx.fillStyle = "red";
    ctx.font = "35px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = "25px Arial";
    ctx.fillText("Điểm của bạn: " + countBeer, canvas.width / 2, canvas.height / 2); // Hiển thị điểm
    ctx.fillText("Bấm nút ResetGame để chơi lại", canvas.width / 2, canvas.height / 2 + 40);
}
function update() {
    if (gameOver) {
        return;
    }
    if (rightPressed && Box.x < canvas.width - Box.width) {
        Box.x = Box.x + Box.speed;
    }
    if (leftPressed && Box.x > 0) {
        Box.x = Box.x - Box.speed;
    }
    for (let i = 0; i < beerBottle.length; i++) {
        let bottle = beerBottle[i];
        bottle.y = bottle.y + bottle.speed;
        if (bottle.y + bottle.height > Box.y && bottle.x + bottle.width > Box.x && bottle.x < Box.x + Box.width) {
            countBeer += 1;
            beerBottle.splice(i, 1);
            i -= 1;
        } else if (bottle.y > canvas.height) {
            missedBeer += 1;
            beerBottle.splice(i, 1);
            i -= 1;
            if (missedBeer >= 3) {
                gameOver = true;
                resetButton.style.display = "block";
            }
        }
    }
}
function resetGame() {
    beerBottle = [];
    countBeer = 0;
    missedBeer = 0;
    gameOver = false;
    gameStarted = true;
    Box.x = canvas.width / 2 - 40;
    resetButton.style.display = "none";
}
function gameLoop() {
    drawBackGround();
    if (gameStarted === false) {
        drawStartGame();
    } else if (gameOver && missedBeer >= 3) {
        drawLoseGame();
    } else {
        drawBeerBox();
        drawBeerBottle();
        drawGame();
        update();
        if (Math.random() < 0.01) {
            createBeerBottle();
        }
    }
    requestAnimationFrame(gameLoop);
}
backgroundImage.onload = function() {
    backgroundImageLoaded = true;
};
beerBottleImage.onload = function() {
    beerBottleImageLoaded = true;
};
beerBoxImage.onload = function() {
    beerBoxImageLoaded = true;
};
startButton.addEventListener("click", function() {
    gameStarted = true;
    startButton.style.display = "none";
});
resetButton.addEventListener("click", function() {
    resetGame();
});
handlekeyPress();
setTimeout(function() {
    gameLoop();
}, 1000);
