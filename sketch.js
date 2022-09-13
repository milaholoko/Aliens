var bg,bgImg;
var player, shooterImg, alienImg;
var skateImg;
var bulletGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3;
var gameState = 'play'


function preload(){
  
  shooterImg = loadAnimation("assets/Shooter/1.png","assets/Shooter/22.png")
  alienImg = loadAnimation("assets/Alien/1.png","assets/Alien/15.png")
  skateImg = loadImage('assets/skate/skate3.png')


  bgImg = loadImage("assets/BackGround.jpg")
  buImg = loadImage("assets/bullet1.png")

  heart1Img = loadImage('assets/heart_1.png')
  heart2Img = loadImage('assets/heart_2.png')
  heart3Img = loadImage('assets/heart_3.png')

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

//adicionando a imagem de fundo
    bg = createSprite(displayWidth/2+100,displayHeight/2,20,20)
    bg.addImage(bgImg)
    bg.scale = 2.9
  

//criando o sprite do jogador
    player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
    player.addAnimation('player',shooterImg)
    player.debug = true
    player.setCollider("circle",0,30,110)
    base= createSprite(player.x-10,player.y+130,100,10)
    base.addImage(skateImg)
    base.scale = 0.4

   alienGroup = new Group()
   bulletGroup = new Group();

   heart1 = createSprite(displayWidth-100,40,20,20)
   heart1.visible = false;
   heart1.addImage('heart1',heart1Img);
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-150,40,20,20)
   heart2.visible = false;
   heart2.addImage('heart2',heart2Img);
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-200,40,20,20)
   heart3.addImage('heart3',heart3Img);
   heart3.scale = 0.4

}

function draw() {
  background(0); 

 if(gameState=='play'){
  if(life==3){
    heart3.visible = true;
    heart1.visible = false;
    heart2.visible = false;
  }

  if(life==2){
    heart3.visible = false;
    heart1.visible = false;
    heart2.visible = true;
  }

  if(life==1){
    heart3.visible = false;
    heart1.visible = true;
    heart2.visible = false;
  }

  if(life==0){
  gameState = "lost"
  heart1.visible = false;

  }
 


  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
  base.y-=30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
 base.y+=30
}

if(keyDown("space")){
bullet = createSprite(player.x+120,player.y+25,40,10)
bullet.addImage("bullet",buImg)
bullet.velocityX = 15
bullet.scale = 0.08
bullet.depth = player.depth
bullet.depth-=1
bulletGroup.add(bullet)
}

if(alienGroup.isTouching(player)){
  for(var i=0;i< alienGroup.length;i++){
    if(alienGroup[i].isTouching(player)){
      alienGroup[i].destroy()
      life-=1
    }
  }
}


alienGroup.overlap(bulletGroup,(alien,bullet)=>{
  bullet.destroy();
  alien.destroy();
})


AlienGenerator();
 }
 
drawSprites();
if(gameState == 'lost'){
  textSize(100)
  fill('white')
  text('Game Over',400,400)
  player.destroy();
  base.destroy();
  alienGroup.destroyEach();
}

}
function AlienGenerator(){
  if(frameCount%50===0){
  alien = createSprite(width,random(100,height-100),40,40)
  alien.addAnimation("alien",alienImg)
  alien.velocityX = -5
  alienGroup.add(alien)
  alien.setCollider("circle",0,0,90)
  }
}