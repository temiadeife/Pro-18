var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var score=0;

var PLAY, END

var gameState=PLAY;

function preload(){
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(400,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(401,250,40,10);
    banana.y = random(10,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 80;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(401,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = random(0.2, 0.4);
    obstacle.lifetime = 80;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        case 50: player.scale=0.20;
                break;
        case 60: player.scale=0.22;
                break;
      case 60: player.scale=0.24;
                break;
       case 70: player.scale=0.26;
                break;
        case 80: player.scale=0.28;
                break;
        case 100: player.scale=0.4;
                break;
        default:break;        
    }
  
    if(keyDown("space")&&player.y>220&&player.y<390) {
      player.velocityY = -16
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)&&player.scale>0.1){ 
        player.scale=0.1;
        obstaclesGroup.destroyEach();
      //score-2;
    }
 
  if(player.scale===0.1){
  switch(score){
        
        case 20: player.scale=0.12;
                break;
        case 30: player.scale=0.14;
                break;
        case 40: player.scale=0.16;
                break;
        case 50: player.scale=0.18;
                break;
        case 100: player.scale=0.4;
                break;
        default:break;        
    }
    switch(score){
        case 30: player.scale=0.12;
                break;
        case 40: player.scale=0.14;
                break;
        case 50: player.scale=0.16;
                break;
        case 100: player.scale=0.4;
                break;
        default:break;        
    }
  }
  
 if(obstaclesGroup.isTouching(player)&&player.scale===0.1){ 
       gameState=END;
   if(gameState===END)
   backgr.velocityX=0;
   FoodGroup.destroyEach();
   obstaclesGroup.destroyEach() ;
   score=0;
   backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

    }
    

  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);
}


  