class Bullet{
    constructor(){
        this.sprite=createSprite(160,gun.y-10)
        this.sprite.addImage("BULLET",bulletImg)
        this.sprite.scale=0.1
        this.sprite.velocityX=10
        this.sprite.lifetime=100
        this.sprite.depth=1
    }
}