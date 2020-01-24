var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obsgroup, obs1, obs2, obs3, obs4, obs5, obs6;
var cloud;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  
  cloud = loadImage("cloud.png");
}

function setup() {
  
  createCanvas(600, 200);   
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  trex.addAnimation("collided", trex_collided);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obsgroup = new Group();
}

function draw() {
  background("white");
  
  trex.collide(invisibleGround);
  
if(gameState===PLAY){
  
  if(keyDown("space") && trex.y>90) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
 SpawnObstacles();
 SpawnClouds();
  
  if(obsgroup.isTouching(trex)){
   gameState = END;
}
}
  
else if(gameState === END){
 trex.velocityY = 0;
 trex.changeAnimation("collided", trex_collided);
 obsgroup.setLifetimeEach(-1);
 obsgroup.setVelocityXEach(0);
 ground.velocityX = 0;
 
}
  
  drawSprites();
}


function SpawnObstacles(){
  if(frameCount%70===0){
 var obstacle = createSprite(590,160,10,30);
 obstacle.velocityX = -5;

    var rand = Math.round(random(1,6));
    
 switch(rand){
   case 1: obstacle.addImage(obs1);
     break;
  case 2: obstacle.addImage(obs2);
     break;
  case 3: obstacle.addImage(obs3);
     break;
  case 4: obstacle.addImage(obs4);
     break;
  case 5: obstacle.addImage(obs5);
     break;
  case 6: obstacle.addImage(obs6);
     break;
     default: break;
   }    
    obstacle.scale=0.6;
    obstacle.lifetime = 200;
    obstacle.depth = trex.depth - 1;
    obsgroup.add(obstacle);
  }
}

function SpawnClouds(){
  if(frameCount%70===0){
 var clouds = createSprite(590,30,30,10);
    
  clouds.addImage(cloud);
   clouds.velocityX= -3;
    clouds.scale = 0.8;
    clouds.y = Math.round(random(5,30));
   } 
 }