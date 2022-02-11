var PLAY = 1;
var END = 0;
var gameState = PLAY;


var bg,bgImg;
var player,playerImg
var deer,deerImg,deerGroup
var laser,laserImg,laserGroup
var shoot = 0;
var score = 0;

var gameOver,gameOverImg;
function preload(){
    bgImg =loadImage("bgnew.jpg");

 playerImg = loadImage("boynew.png");
 deerImg =loadImage("deernew.png");
  laserImg =loadImage("bulletnew.png");
  gameOverImg=loadImage("game over.png")
}


function setup(){
    createCanvas(1000,600)

 bg = createSprite(600,300);
    bg.addImage(bgImg);
    bg.scale =1.0;
bg.velocityX =-2;


player =createSprite(50,450);
player.addImage(playerImg);
player.scale =1.0;

gameOver =createSprite(500,300);
gameOver.addImage(gameOverImg);
gameOver.visible = false;

deerGroup = new Group;
laserGroup =new Group;

score  = 0  ;
stroke("red");
fill("red");
textSize(25);
    

}

function draw(){
    background(0);
if(gameState ===PLAY){
  if(keyDown("UP_ARROW")){
    player.y = player.y - 4;
  
  }
  if(keyDown("DOWN_ARROW")){
    player.y = player.y + 4;
  
  }
  
    
  if(keyDown("LEFT_ARROW")){
    player.x = player.x - 4;
   
  }
  if(keyDown("RIGHT_ARROW")){
    player.x = player.x + 4;
  
  }
  gameOver.visible = false;

  if (bg.x <50){
    bg.x = bg.width/2;
  }
  bg.velocityX =-2

  
  shoot = shoot-1
  if(keyDown("space") && shoot <0){
  laser = createSprite(player.x,player.y);
  laser.addImage(laserImg);
  laser.velocityX = 5 ;
  laserGroup.add(laser);
  shoot = laser.x;
  laser.scale = 0.25;
 
  }

if(laserGroup.isTouching(deerGroup)){
  score = score+10;
  //deerGroup.destoryEach();
  deerGroup[0].destroy();
}
  
if(deerGroup.isTouching(player)){
  gameState =END 
}

}

else if(gameState === END){
bg.velocityX =0 
deerGroup.setVelocityXEach(0);
deerGroup.setVisibleEach(false);
gameOver.visible =true

}
   


  

 

  
  spawnDeers();
    drawSprites();
    text("Score:"+score,300,50);
}



function spawnDeers(){
    if(World.frameCount % 150 === 0){
        deer =createSprite(1100,500);
        deer.addImage(deerImg);
        deer.velocityX =-2;
       // deer.y =Math.round(random(550,50));
        deerGroup.add(deer);
        deer.scale = 0.25
    }
}

