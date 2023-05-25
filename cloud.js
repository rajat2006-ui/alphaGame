class Cloud{
    constructor(letter){
        
            this.sprite=createSprite(970,random(50,550))
            this.sprite.scale=0.5
            this.sprite.addImage("cld",cloudImg)
            this.sprite.lifetime=330
            this.letter=letter
    }

    display(){
        if(this.sprite){
            this.sprite.x-=5
            fill("orange")
            textSize(50)
            text(this.letter,this.sprite.x-20,this.sprite.y+20)
            //console.log(this.letter.depth)
        }
    }
}