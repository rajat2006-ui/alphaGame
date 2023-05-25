var cloudImg
var bowImg,arrowImg
var gunImg,bulletImg
var magazineImg
var balloon1Img,balloon2Img,balloon3Img,balloon4Img
var gameState="level1"
var rightImg,heartImg
var level1=new Level1()
var level2=new Level2()

function preload(){
    cloudImg=loadImage("cloud.png")
    bowImg=loadImage("bow.png")
    arrowImg=loadImage("arrow.png")
    rightImg=loadImage("right.png")
    heartImg=loadImage("chances left.png")
    gunImg=loadImage("gun.png")
    bulletImg=loadImage("bullet.png")
    balloon1Img=loadImage("balloon1.png")
    balloon2Img=loadImage("balloon2.png")
    balloon3Img=loadImage("balloon3.png")
    balloon4Img=loadImage("balloon4.png")
    magazineImg=loadImage("magazine.png")
}

function setup(){
    createCanvas(1000,600)

    level1.setup()
    level2.setup()
}

function draw(){
    background("lightblue")
    drawSprites()

    
    //level1
    if(gameState==="level1"){
        if(level1.state==="instruction"){
            level1.instruct()
        }

        else if(level1.state==="help"){
            level1.help()
        }

        else if(level1.state==="start"){
            level1.start()
        }

        else if(level1.state==="passed" || level1.state==="fail"){
            level1.end()
        }
    }

    if(gameState==="level2"){
        if(level2.state==="instruction"){
            level2.instruct()
        }

        else if(level2.state==="help"){
            level2.help()
        }

        else if(level2.state==="start"){
            level2.start()
        }

        else if(level2.state==="passed" || level2.state==="failed"){
            level2.end()
        }
    }

    if(gameState==="level3"){
        textSize(40)
        fill("yellow")
        text("Sorry, Next Level Is Not Built Yet",250,250)
    }
}
