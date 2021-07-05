var tower, towerImg;
var doorImg, doorGroup;
var railingGroup, railingImg;
var ghost, ghostImg;
var invisibleBlockGroup;
var gameState="PLAY";
var spookySound;

function preload(){
  
towerImg=loadImage("tower.png");
doorImg=loadImage("door.png");
railingImg=loadImage("climber.png");
ghostImg=loadImage("ghost-standing.png");
spookySound=loadSound("spooky.wav");

  
}

function setup(){
   createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=2;
  
  ghost=createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale=0.3;
  
  //spookySound.loop(); 
  

  
  
  
  doorGroup=new Group();
  railingGroup=new Group();
  invisibleBlockGroup=new Group();
  
  
}

function draw(){
  background(0);
  
  if(gameState==="PLAY"){
  
 if(tower.y>400){
   tower.y=300;
 }
  
  if(keyDown(LEFT_ARROW)){  
   // ghost.x=ghost.x-3;
    ghost.x-=3
  }
  
  if(keyDown(RIGHT_ARROW)){
   // ghost.x=ghost.x-3;
    ghost.x+=3;
  }
  
  if(keyDown("SPACE")){
    ghost.velocityY=-10;
  }
  
  ghost.velocityY+=0.8;  
  
  if(ghost.isTouching(railingGroup)){
    ghost.velocityY=0 
  }
  
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
  
  spawnDoors();
  }else if(gameState==="END")  {
    background(0);
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250)
    tower.destroy();
    doorGroup.destroyEach();
    railingGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
  }
    
 drawSprites() 
}

function spawnDoors(){
  if(frameCount%200===0){
    var door=createSprite(Math.round(random(120,475)),-100);
    door.addImage("door",doorImg);
    door.velocityY=2;
    doorGroup.add(door);
    door.lifetime=600/2;
    var railing = createSprite(200,100)
    railing.x=door.x;
    railing.y=door.y+60;
    railing.addImage(railingImg);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width=railing.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=2
    invisibleBlock.lifetime=600/2;
    invisibleBlockGroup.add(invisibleBlock);
    railing.velocityY=2;
    railingGroup.add(railing);
    railing.lifetime=600/2;
    ghost.depth=door.depth+1;
  }
}