 var player1,player2;
 var coin1,coin2,coin3,coin4,coin5,coin6,coin7,coin8,coin9,coin10;
 var playerImage;
 var coinImage;
 var edges;
 var rand=0;
 var gameState="serve";
 var bg;
 var goal1,goal2;
 var player1Score=0;
 var player2Score=0;
 
 function preload (){
	 playerImage=loadImage("player.png");
	 coinImage=loadImage("coin.png");
	 bg=loadImage("background.jpg");
 }

 function setup(){
	 createCanvas(displayWidth,displayHeight-150);
    player1=createSprite(200,(displayHeight-150)/2,50,50);
	player1.shapeColor="yellow"
	player1.addImage(playerImage);
	player1.scale=0.3;
	player2=createSprite(displayWidth-200,(displayHeight-150)/2,50,50);
	player2.shapeColor="yellow";
	player2.addImage(playerImage);
	player2.scale=0.3;

	coin1=createSprite(displayWidth/2,(displayHeight-150)/2,40,40);
	coin1.shapeColor="red";
	coin1.addImage(coinImage);
	coin1.scale=0.2;
    player1.debug=true;
	player2.debug=true;
	coin1.debug=true;
	player1.setCollider("circle",0,0,250);
	player2.setCollider("circle",0,0,250);
	coin1.setCollider("rectangle",0,0,500,250);

	goal1=createSprite(20,(displayHeight-150)/2,40,300);
	goal1.shapeColor="yellow";

	goal2=createSprite(displayWidth-20,(displayHeight-150)/2,40,300);
    goal2.shapeColor="yellow";
	 
 }

 function draw(){
	 background(bg);
	 if(keyDown("UP")){
		 player1.y=player1.y-5;
	 }

	if(keyDown("DOWN")){
		player1.y=player1.y+5;
	}

	if(keyDown("W")){
		player2.y=player2.y-5;
	}

	if(keyDown("S")){
		player2.y=player2.y+5;
	}

if(gameState==="serve"){
	textSize(25);
	strokeWeight(4);
	stroke(0);
	fill("yellow");
	text("Press space to serve",displayWidth/2-100,displayHeight/2-120);
}
rand=Math.round(random(1,4));
console.log(rand);

if(keyDown("space")&& gameState==="serve"){
  if(rand===1){
	  coin1.velocityX=-random(6,10);
	  coin1.velocityY=-random(6,10);
  }
  else if(rand===2){
	coin1.velocityX=-random(6,10);
	coin1.velocityY=random(6,10);
}
else if(rand===3){
	coin1.velocityX=+random(6,10);
	coin1.velocityY=-random(6,10);
}
 else if(rand===4){
	coin1.velocityX=random(6,10);
	coin1.velocityY=random(6,10);
}
gameState="play";
 
}
 if(coin1.isTouching(goal2)||coin1.isTouching(goal1)){
	 if(coin1.isTouching(goal1)){
		 player2Score+=1;
	 }

	 if(coin1.isTouching(goal2)){
		player1Score+=1;
	}
	 
 reset();
	 
 }
 if(player1Score===10||player2Score===10){
	 gameState="over";
	 textSize(50);
	 fill("black");
	 stroke("red");
	 strokeWeight(4);
	 text("Game Over",displayWidth/2-140,displayHeight/2-120);
	 textSize(30);
	 text("Press R to Reset",displayWidth/2-110,displayHeight/2+10);
	  
	 if(keyDown("R")){
		 player1Score=0;
		 player2Score=0;
		 reset();
	 }
	 
 }
	edges=createEdgeSprites();
	coin1.bounceOff(edges);
	player1.bounceOff(edges);
	player2.bounceOff(edges);
 

	coin1.bounceOff(player1);
	coin1.bounceOff(player2);

    drawSprites();

	textSize(20);
	fill("black");
	stroke("red");
	strokeWeight(4);
	text(" Player1 Score: "+player1Score,120,50);

	text(" Player2 Score: "+player2Score,displayWidth-300,50);
 }
function reset(){
	 coin1.x=displayWidth/2;
	 coin1.y=(displayHeight-150)/2;
	 coin1.setVelocity(0,0);
	 gameState="serve";
	 player1.x=200;
	 player1.y=(displayHeight-150)/2;

	 player2.x=displayWidth-200;
	 player2.y=(displayHeight-150)/2;
}

