var gun,magazine
var bullets=[]
var balloons=[]
var randomIndex

class Level2{
    constructor(){
        this.state="instruction"
        this.helpButton
        this.startButton
        this.nextButton
        this.restartButton
        this.reloadTime=70
        this.rateOfFire=10
        this.gunState="ready to shoot"
        this.correctAnswers=0
        this.chancesLeft=5
    }

    setup(){
        this.helpButton=createButton('Need Help?')
        this.helpButton.position(230,450)
        this.helpButton.style('background','pink')
        this.helpButton.style('height','40px')
        this.helpButton.style('width','90px')
        this.helpButton.hide()

        this.startButton=createButton('Start')
        this.startButton.position(500,450)
        this.startButton.style('background','yellow')
        this.startButton.style('height','40px')
        this.startButton.style('width','70px')
        this.startButton.hide()

        this.restartButton=createButton('Restart')
        this.restartButton.position(350,450)
        this.restartButton.style('background','orange')
        this.restartButton.style('height','50px')
        this.restartButton.style('width','70px')
        this.restartButton.hide()

        this.nextButton=createButton('Next')
        this.nextButton.position(500,450)
        this.nextButton.style('background','lightgreen')
        this.nextButton.style('height','50px')
        this.nextButton.style('width','70px')
        this.nextButton.hide()

        magazine=createSprite(95,260)
        magazine.addImage("MAGAZINE",magazineImg)
        magazine.scale=0
        
        gun=createSprite(100,250)
        gun.addImage("GUN",gunImg)
        gun.scale=0
    }

    instruct(){
        fill("red")
        textSize(80)
        text("PLAYING WITH LETTERS",30,70)
        
        textSize(65)
        text("Level  2",285,200)

        fill("green")
        textSize(30)
        text("Shoot The Words Which Get 'An' Article",200,350)
        text("Shoot 10 Correct Words To Win",200,380)
        text("Press Space To Shoot. Use Arrow Keys To Move The Gun",200,410)

        this.restartButton.hide()
        this.nextButton.hide()
        gun.scale=0
        magazine.scale=0

        this.startButton.show()
        this.helpButton.show()

        this.helpButton.mousePressed(()=>{
            this.state="help"
        })

        this.startButton.mousePressed(()=>{
            this.state="start"
        })

    }

    help(){
        fill("red")
        textSize(80)
        text("PLAYING WITH LETTERS",30,70)
        
        textSize(65)
        text("Level  2",285,200)
        
        fill("white")
        textSize(30)
        text("If The Pronounciation Of A Word Starts With Vowel Then It Gets 'An'Article",10,350)
        text("Example : Apple, umbrella",10,390)

        this.helpButton.hide()

        this.startButton.mousePressed(()=>{
            this.state="start"
        })
    }

    start(){
        this.helpButton.hide()
        this.startButton.hide()
        
        magazine.scale=0.15
        gun.scale=0.7
        
        //to move the gun
        if(keyDown("UP_ARROW")){
            gun.y-=10
            magazine.y-=10
        }

        else if(keyDown("DOWN_ARROW")){
            gun.y+=10
            magazine.y+=10
        }

        //to shooot
        this.rateOfFire-=1
        if(keyDown("space") && this.rateOfFire<0){
            bullets.push(new Bullet())
            this.rateOfFire=15
        }

        //to select a word
        //g for group
        var g1=["Unique","Chinese","Paint","Card","Word","Paper","House","Door","Fire","Water"]
        var g2=["Uniform","Japanese","Button","Box","Run","Monkey","Donkey","Beach","Plane","Vehicle"]
        var g3=["Europian","Letter","Little","Catch","Shoot","View","Files","Style","Colour","Zeebra"]
        var g4=["Indian","Enter","Exams","Ant","Army","Honour","Arrow","Index","Umbrella","Over"]
        var g5=["American","Ox","Uncle","Aunt","End","M.P.","Appear","Open","Eight","Undo"]
        var allGroups=[g1,g2,g3,g4,g5]
        randomIndex=Math.round(random(0,4))

        //to make ballons appear
        if(frameCount%80===0){
            balloons.push(new Balloon(allGroups[randomIndex][Math.round(random(0,9))]))
        }

        for(var i=0;i<balloons.length;i++){
            balloons[i].display()
        }
        

        //to check collision
        for(var i=0;i<bullets.length;i++){
            for(var j=0;j<balloons.length;j++){
                if(bullets[i].sprite.isTouching(balloons[j].sprite)){
                    bullets[i].sprite.remove()
                    bullets.splice(i,1)

                    if(balloons[j].index===3 || balloons[j].index===4){
                        this.correctAnswers+=1
                    }

                    else{
                        this.chancesLeft-=1
                    }

                    balloons[j].sprite.remove()
                    balloons.splice(j,1)
                }
            }
        }

        //To Display Hearts And Correct Mark
        for(var i=1;i<=this.correctAnswers;i++){
            image(rightImg,i*50,30,30,30)
        }

        for(var j=1;j<=this.chancesLeft;j++){
            image(heartImg,j*50,550,30,30)
        }

        if(this.correctAnswers===10){
            this.state="passed"
        }

        else if(this.chancesLeft===0){
            this.state="failed"
        }
    }

    end(){
        if(this.state==="passed"){
            fill("green")
            textSize(40)
            text("CONGRATS! YOU PASSED IT",250,300)

            this.restartButton.show()
            this.nextButton.show()
        }
    
        else if(this.state==="failed"){
    
            fill("red")
            textSize(40)
            text("YOU FAILED TRY AGAIN",250,300)

            this.restartButton.show()
        }

        for(var i=0;i<balloons.length;i++){
            balloons[i].sprite.lifetime=-1
        }

        this.correctAnswers=0
        this.chancesLeft=5

        this.restartButton.mousePressed(()=>{
            this.state="instruction"
        })

        this.nextButton.mousePressed(()=>{
            gameState="level3"
            gun.scale=0
            magazine.scale=0
            this.nextButton.hide()
            this.restartButton.hide()
        })
    }
}