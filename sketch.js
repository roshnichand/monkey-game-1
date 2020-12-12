
var monkey , monkey_running, monkey_giggle , monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var PLAY = 1, END = 0, gameState = 1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_giggle = loadSound("Giggle.mp3");
  monkey_stop = loadAnimation("sprite_0.png")
}



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(100,350,10,10);
  monkey.addAnimation("running", monkey_running)
  monkey.addAnimation("stop", monkey_stop)
  monkey.scale=.1
  
  ground = createSprite(0,390,800,10);
  ground.velocityX = -3;
  
  FoodGroup  = new Group();
  obstacleGroup  = new Group();
    
}


function draw() {
  background("skyblue");
  
  text("Bananas : " + score,300,100);
  
  if(ground.x<0){
      ground.x = ground.width/2;
    
  }
  monkey.collide(ground);  
  monkey.velocityY = monkey.velocityY + 0.5  
       

  if (gameState === PLAY){
  
    
    if(keyDown('space') && monkey.y>354){
      monkey.velocityY = -15  ;
    }

    food();
    stone();

    if (FoodGroup.isTouching(monkey)){
      score = score + 1;
      monkey_giggle.play();
      FoodGroup.destroyEach();
    }

    if (obstacleGroup.isTouching (monkey)){
      gameState = END;
      
    }
    
  }
  else {
    monkey.changeAnimation("stop", monkey_stop);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    textSize(30);
    fill("red");  
    text("GAMEOVER!!!",118,180)
    textSize(20); 
    text("Press R to Restart",128,230)
    
    if(keyDown("r")){
      gameState = PLAY;
      monkey.changeAnimation("running",monkey_running); 
      score=0;
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
          }
  }
  
  drawSprites();  
}

function food() {
  if(frameCount % 80 === 0 ) {
    banana = createSprite(350,250,10,10);
    
    banana.addImage(bananaImage);
    banana.scale = .1;
    banana.velocityX = -3;
    banana.lifetime = 100;
    FoodGroup.add(banana);
  }
}

function stone() {
  if(frameCount % 300 === 0 ) {
    obstacle = createSprite(450,360,10,10);
     
    obstacle.addImage(obstacleImage);
    obstacle.scale = .15 ;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.debug=true;
    obstacle.setCollider("rectangle",-15,0,450,400)
    obstacleGroup.add(obstacle);
  }
}





