class Enemy {
    constructor(x, y, health,color) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.color = color;
        this.size = 20;
        this.shadowBlur = "blue";
        this.font = "new times roman";
        this.width = 4;
    }
    setStyle(ctx) {
        ctx.lineWidth = this.width;
        ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur = 2;
        ctx.lineJoin = "bevel";
    }
    draw(ctx) {
        this.setStyle(ctx);
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.size, this.size);
        this.drawHealth(ctx);
    }
    drawHealth(ctx) {
        ctx.font = "10px " + this.font;
        ctx.fillStyle = "white";
        if(this.health>9){
            ctx.fillText(this.health, this.x + 4, this.y + 15);
        }
        else{
            ctx.fillText(this.health, this.x+7, this.y + 15);
        }
    }
    getDamages(bullet) {
        const midSize = this.size / 2;
        if (bullet.y - this.size <= this.y && bullet.x - midSize > this.x - midSize && bullet.x - midSize < this.x + midSize) {
            if (this.width > 1) {
                this.width--;
            }
            else {
                this.width = 1;
                this.health--;
            }
            return true;
        }
        return false;
    }
    testIn(val, min, max) {
        if (val > min && val < max) {
            return true;
        }
        else {
            return false;
        }
    }
}