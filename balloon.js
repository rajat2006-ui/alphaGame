var randomNumber

class Balloon{
    constructor(word){
        var balloonArray=[balloon1Img,balloon2Img,balloon3Img,balloon4Img]
        randomNumber=Math.round(random(0,3))

        this.sprite=createSprite(1030,random(50,550))
        this.sprite.addImage("BALLOON",balloonArray[randomNumber])
        this.sprite.scale=0.5
        this.sprite.lifetime=190
        this.sprite.velocityX=-6
        this.word=word
        this.index=randomIndex
        this.number=randomNumber
    }

    display(){
        if(this.sprite){
            switch(this.number){
                case 0:fill("white")
                break;

                case 1:fill("blue")
                break;

                case 2:fill("red")
                break;

                case 3:fill("black")
                break;
            }
            //fill("white")
            textSize(25)
            text(this.word,this.sprite.x-40,this.sprite.y)
        }
    }
}