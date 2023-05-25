var bow,arrows=[]
var shotArrow=[]
var clouds=[]

//i don't know how to change the textsize of  a button
var startText="Start"
var helpText="Need Help?"
var nextText="Next"
var RestartText="Restart"

class Level1{
    constructor(){
        this.startButton,this.helpButton
        this.state="instruction"
        this.arrowState="ready to launch"
        this.reloadTime=40
        this.correctAnswers=0
        this.chanceLeft=5
        this.restartButton
        this.nextButton
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

        bow=createSprite(100,250)
        bow.addImage("BOW",bowImg)
        bow.scale=0

        arrows.push(new Arrow(0))

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
        this.nextButton.depth=1
    
    }

   


    instruct(){
        fill("red")
        textSize(80)
        text("PLAYING WITH LETTERS",30,70)
        
        textSize(65)
        text("Level  1",285,200)

        textSize(30)
        text("Find And Shoot The Vowels",200,350)
        text("Shoot 10 Vowels To Complete the Level",200,380)
        text("Press Space Button To Shoot. Use Arrow Keys To Move The Bow",200,410)

        this.restartButton.hide()
        this.nextButton.hide()

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
        this.helpButton.hide();
        fill("green")
        textSize(80)
        text("ALPHA GAME",280,70)
        
        textSize(65)
        text("Level  1",285,200)

        textSize(30)
        text("In English Alphabet A,E,I,O And U Are Known As Vowels",100,300)
        text("Remaining Letters Are Known As Consonants",100,340)

        this.startButton.mousePressed(()=>{
            this.state="start"
        })

    }

    start(){

       
        
       
        //g for group
        this.helpButton.hide()
        this.startButton.hide()
        var g1=["a","a","a"]
        var g2=["e","e","e"]
        var g3=["i","i","i"]
        var g4=["o","o","o"]
        var g5=["u","u","u"]
        var g6=["b","c","d"]
        var g7=["f","g","h"]
        var g8=["j","k","l"]
        var g9=["m","n","p"]
        var g10=["q","r","s"]
        var g11=["t","v","w"]
        var g12=["x","y","z"]
        var allgroups=[g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12]

        bow.scale=0.35

        var randomLetter=allgroups[Math.round(random(0,11))][Math.round(random(0,2))]

        if(frameCount%80===0){
            clouds.push(new Cloud(randomLetter))
        }

        for(var i=0;i<clouds.length;i++){
            clouds[i].display()
            
        }

        for (var d=1;d<=this.correctAnswers;d++){
            image(rightImg,d*50,50,30,30)
        }

        for(var h=1;h<=this.chanceLeft;h++){
            image(heartImg,h*50,550,30,30)
        }

        //to launch the arrow
        this.reloadTime--
        for(var j=0;j<arrows.length;j++){
            arrows[j].sprite.scale=0.5
            if(this.arrowState==="ready to launch" && arrows[j].sprite.x<100){
                arrows[j].moveWithBow()
            }

            if(keyWentDown("space") &&  this.arrowState==="ready to launch"){
                arrows[j].sprite.velocityX=6
                shotArrow.push(arrows[j])
                arrows.splice(j,1)
                this.reloadTime=70
                this.arrowState="create new arrow"
            }

        }


            for(var x=0;x<shotArrow.length;x++){
                shotArrow[x].sprite.velocityX=6

                if(shotArrow[x].life<0){
                    shotArrow[x].sprite.remove()
                    shotArrow.splice(x,1)
                }
            }


            if(this.arrowState==="create new arrow" && this.reloadTime<0){
                arrows.push(new Arrow(0.5))
                this.arrowState="ready to launch"
            
            }

        //to move the bow
        if(keyDown("UP_ARROW")){
            bow.y-=10
        }

        else if(keyDown("DOWN_ARROW")){
            bow.y+=10
        }

        //To check Collision Between Arrow And Cloud
        for(i=0;i<shotArrow.length;i++){
            for(j=0;j<clouds.length;j++){
                if(shotArrow[i].sprite.isTouching(clouds[j].sprite)){x
                    console.log("y")
                    shotArrow[i].sprite.remove()
                    shotArrow.splice(i,1)
                    clouds[j].sprite.remove()

                    if(clouds[j].letter==="a"||
                    clouds[j].letter==="e"||
                    clouds[j].letter==="i"||
                    clouds[j].letter==="o"||
                    clouds[j].letter==="u"  ){
                        this.correctAnswers+=1
                    }

                    else{
                        this.chanceLeft-=1
                    }

                    clouds[j].letter=""
                    clouds.splice(j,1)
                    break;
                }
            }
        }

        if(this.correctAnswers===10){
            this.state="passed"
        }

        else if(this.chanceLeft===0){
            this.state="fail"
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
    
        else if(this.state==="fail"){
    
            fill("red")
            textSize(40)
            text("YOU FAILED TRY AGAIN",250,300)

            this.restartButton.show()
        }

        for(var i=0;i<clouds.length;i++){
            clouds[i].sprite.remove()
        }

        this.nextButton.mousePressed(()=>{
            gameState="level2"
            bow.scale=0
            this.nextButton.hide()
            this.restartButton.hide()
        })

        this.restartButton.mousePressed(()=>{
            this.state="instruction"
            this.nextButton.hide()
            this.restartButton.hide()
            this.chanceLeft=5
            this.correctAnswers=0
        })
    }
}
    /* 
    step1:- create and move clouds(done)
    step2:-display letters(done)
    step3:-give instructions(done)
    step4:-dissapear clouds when arrow is shot(done)
    step5:-check it is right or wrong (done)
    */