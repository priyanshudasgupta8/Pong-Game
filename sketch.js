const W = 87;
const S = 83;
const SP = 32;
const R = 82;

var playerPaddle, computerPaddle;
var playerScore, computerScore;
var ball;
var score;
var gameState;

function setup() {
  var canvas = createCanvas(100, 100);

  playerPaddle = createSprite(95, 50, 3, 25);
  computerPaddle = createSprite(5, 50, 3, 25);
  ball = createSprite(50, 50, 3, 3);

  computerScore = 0;
  playerScore = 0;
  gameState = "serve";
}

function draw() {
  background(220);
  edges = createEdgeSprites();

  text(computerScore, 20, 20);
  text(playerScore, 75, 20);

  for (var i = 5; i < 100; i += 20) {
    line(50, i, 50, i+10);
  }

  if(keyDown(SP) && gameState == "serve") {
    ball.velocityX += 2;
    ball.velocityY += 1;
    gameState = "play";
  }

  if (keyDown(UP_ARROW) || keyDown(W)) {
    playerPaddle.y -= 3;
  } else if (keyDown(DOWN_ARROW) || keyDown(S)) {
    playerPaddle.y += 3;
  }

  if (ball.isTouching(playerPaddle)) {
    ball.velocityX = -ball.velocityX;
  }

  if (ball.isTouching(computerPaddle)) {
    ball.velocityX = -ball.velocityX;
  }

  if(ball.x < 0 || ball.x > 100) {

    if (ball.x < 0) {
      playerScore++;
    } else {
      computerScore++;
    }

    ball.x = 50;
    ball.y = 50;
    ball.velocityY = 0;
    ball.velocityX = 0;
    gameState = "serve";

    if (computerScore === 5 || playerScore === 5) {
      gameState = "over";
    }

  }

  if (gameState == "over"){
    if (keyDown(R)) {
      gameState = "serve";
      playerScore = 0;
      computerScore = 0;
    }
  }

  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.velocityY = -ball.velocityY;
  }

  computerPaddle.y = ball.y;

  drawSprites();
}
