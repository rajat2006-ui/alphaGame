class Arrow{
    constructor(size){
        this.sprite=createSprite(97,bow.y)
        this.sprite.addImage("arrw",arrowImg)
        this.sprite.scale=size
        this.state="ready to launch"
        this.life=300
    }

    moveWithBow(){
        this.sprite.y=bow.y
    }
}