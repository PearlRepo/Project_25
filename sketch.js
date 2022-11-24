const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var sound1, sound2;
var playerArrows = [];
var board1, board2;
var numberOfArrows = 10;



function preload() {
  backgroundImg = loadImage("./assets/background.jpg");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
  sound2= loadSound ("./assets/bow_new.mp3")
  sound1= loadSound("./assets/load.mp3")
}

function setup() {
  canvas = createCanvas(windowWidth-20, windowHeight-20);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(190, height-170, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(playerBase.position.x +50, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher (playerBase.position.x + 130, playerBase.position.y - 100, 90, 100);

  board1 = new Board(width - 300, 430, 90, 200);
  board2 = new Board(width - 550, height - 350, 90, 200);

}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();

  board1.display();
  board2.display();

 for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
    }
  }


   // Title
   fill("#FFFF");
   textFont("Courier New")
   textAlign("center");
   textSize(100);
   text("EPIC ARCHERY", width / 2, 100)

   // Arrow Count
  fill("#FFFF");
  textFont("Courier New")
  textAlign("center");
  textSize(30);
  text("Remaining Arrows: " + numberOfArrows, width/1.5, height-30);

}


function keyReleased() {
  if (keyCode === 32) {
      playerArrows[playerArrows.length - 1].shoot(playerArcher.body.angle);
      
      if ( numberOfArrows >0 ) {sound2.play();}
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if ( numberOfArrows >=1 ) {
      var arrow = new PlayerArrow(playerArcher.body.position.x, playerArcher.body.position.y, 100, 10, playerArcher.body.angle);
      Matter.Body.setAngle(arrow.body, playerArcher.body.angle);
      playerArrows.push(arrow);

      numberOfArrows = numberOfArrows-1;

      sound1.play();
    }

  }
}