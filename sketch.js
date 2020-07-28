const W = 87;
const S = 83;
const SP = 32;
const R = 82;

var playerPaddle, computerPaddle;
var playerScore, computerScore;
var ball;
var score;
var gameState;
var endSound;

function setup() {
  var canvas = createCanvas(400, 400);

  playerPaddle = createSprite(380, 200, 10, 100);
  computerPaddle = createSprite(20, 200, 10, 100);
  ball = createSprite(200, 200, 12, 12);

  endSound = loadSound('endState.mp3');

  computerScore = 0;
  playerScore = 0;
  gameState = "serve";
}

function draw() {
  background(220);
  edges = createEdgeSprites();

  textSize(50);
  text(computerScore, 200-100, 65);
  text(playerScore, 275, 65);

  for (var i = 5; i < 400; i += 20) {
    line(200, i, 200, i+10);
  }

  if(keyDown(SP) && gameState == "serve") {
    ball.velocityX += 5;
    ball.velocityY += 2.5;
    gameState = "play";
  }

  if (keyDown(UP_ARROW) || keyDown(W)) {
    playerPaddle.y -= 5;
  } else if (keyDown(DOWN_ARROW) || keyDown(S)) {
    playerPaddle.y += 5;
  }

  if (ball.isTouching(playerPaddle)) {
    ball.velocityX = -ball.velocityX;
  }

  if (ball.isTouching(computerPaddle)) {
    ball.velocityX = -ball.velocityX;
  }

  if(ball.x < 0 || ball.x > 400) {

    if (ball.x < 0) {
      playerScore++;
    } else {
      computerScore++;
    }

    ball.x = 200;
    ball.y = 200;
    ball.velocityY = 0;
    ball.velocityX = 0;
    gameState = "serve";

    if (computerScore == 5 || playerScore == 5) {
      gameState = "over";
      endSound.play();
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
