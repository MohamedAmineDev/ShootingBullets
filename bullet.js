class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 6;
        this.color = "gold";
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size/2, this.size);
    }
    move(velocity){
        const midSize=this.size/2;
        if(this.x-midSize>0){
            this.y-=velocity;
        }
    }
}