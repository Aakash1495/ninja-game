var play = 1;
var end = 0;
var gameState = play;
var player;
var playerstand;
var playerrunl, playerrunr;
var playerjump;
var enemygrp;
var bg;
var g, gIm;
var poision, obstacle;

function preload(){
    bg = loadImage("bg.png");
    playerstand = loadAnimation("SN1.png", "SN2.png", "SN3.png", "SN4.png");
    playerrunl = loadAnimation("RNL1.png", "RNL2.png", "RNL3.png", "RNL4.png", "RNL5.png", "RNL6.png", "RNL7.png");
    playerrunr = loadAnimation("RNR1.png", "RNR2.png", "RNR3.png", "RNR4.png", "RNR5.png", "RNR6.png", "RNR7.png");
    playerjump = loadAnimation("JNR1.png", "JNR2.png", "JNR3.png", "JNR4.png", "JNR5.png", "JNR6.png", "JNR7.png", "JNR8.png", "JNR9.png", "JNR10.png");
    gIm = loadImage("ground.png");
}

function setup(){
    createCanvas(1000,500);

    player = createSprite(50,450,20,20);

    g = createSprite(500,480,1000,20);

    g.addImage("ground", gIm);

    enemygrp = createGroup();

    
}

function draw(){

    background(bg);

    edge = createEdgeSprites();

    player.collide(edge[0]);
    player.collide(edge[1]);
    player.collide(edge[2]);
    player.collide(g);

    if(gameState === play){

        player.addAnimation("p1", playerstand);
        player.addAnimation("p2", playerrunr);
        player.addAnimation("p3", playerrunl);
        player.addAnimation("p4", playerjump);

        player.velocityY = player.velocityY + 0.5;

        if (keyDown("UP_ARROW") || keyDown("w")){
            player.velocityY = -10;
            player.changeAnimation("p4", playerjump);
            player.scale = 0.07;
        }
        else if(keyDown("LEFT_ARROW") || keyDown("a")){
        player.x= player.x -10;
            player.changeAnimation("p3", playerrunl);  
            player.scale = 0.07; 
        }
        else if (keyDown("RIGHT_ARROW") || keyDown("d")){
            player.x = player.x +10;
            player.changeAnimation("p2", playerrunr);
            player.scale = 0.07;
        }
        else{
            player.changeAnimation("p1", playerstand);
            player.scale = 0.07;
        }

        spwanObstacles();
        spwanPoision();

        if (enemygrp.isTouching(player)){
            gameState = end;
        }
    }
    else if(gameState === end){
        enemygrp.setVelocityXEach(0);
        player.velocityY = player.velocityY + 0.5;
        player.changeAnimation("p1", playerstand);
    } 
    drawSprites();
}

function spwanObstacles(){
    if (World.frameCount%150 == 0){
        obstacle = createSprite(1000, 450, 50, 50); 
        obstacle.velocityX = random(-1,-2)
        enemygrp.add(obstacle);
    }
}

function spwanPoision(){
    if (World.frameCount%200 == 0){
    poision = createSprite(1000, random(150, 300), 50, 50);
    poision.velocityX = random(-1,-2);
    enemygrp.add(poision);
    }
}
