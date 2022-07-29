class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bullets = new Array();
        this.size = 10;
        this.color = "blue";
        this.shadowColor="yellow";
        this.delay = 0;
    }
    addBullet(x, y) {
        this.bullets.push(new Bullet(x, y));
    }
    deleteBullet(i) {
        this.bullets.splice(i, 1);
    }
    numberOfBullets() {
        return parseInt(this.bullets.length);
    }
    setStyle(ctx) {
        ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur = 2;
        ctx.lineJoin = "bevel";
        ctx.lineWidth = 2;
    }
    drawBullets(ctx) {
       if(this.bullets.length==1){
        this.bullets[0].draw(ctx);
       }
       else{
        let i = 0;
        while (i < this.bullets.length) {
            this.bullets[i].draw(ctx);
            i++;
        }
       }
    }
    draw(ctx) {
        this.setStyle(ctx);
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.size, this.size);
        this.drawBullets(ctx);
    }
    move(ctx, velocity, directions, bounds) {
        /*upKeyDown,rightKeyDown,leftKeyDown,downKeyDown*/
        const h = bounds.height;
        if (this.y - velocity >= h / 2) {
            if (directions.upKeyDown) {
                this.y -= velocity;
            }
        }
        if (this.y + velocity + 10 < h) {
            if (directions.downKeyDown) {
                this.y += velocity;
            }
        }
        if (this.x + velocity + 10 < bounds.width) {
            if (directions.rightKeyDown) {
                this.x += velocity;
            }
        }

        if (this.x - velocity > 0) {
            if (directions.leftKeyDown) {
                this.x -= velocity;
            }
        }
        this.moveBullets(velocity, bounds);
    }
    moveBullets(velocity, bounds) {
        let i = 0;
        while (i < this.bullets.length) {
            this.bullets[i].move(velocity);
            if (this.bullets[i].y < 0) {
                this.bullets.splice(i, 1);
            }
            else {
                i++;
            }
        }
    }
    fireBullet(state,sound) {
        if (state) {
            if (this.delay == 0) {
                //sound.play();
                let bx = this.x - (this.size / 2);
                bx += 9;
                let by = this.y + (this.size / 2) - 10;
                //alert("bx="+bx+"by="+by);
                this.addBullet(bx, by);
                this.delay = 6;
            }
            else {
                this.delay--;
            }
        }
    }
    testBullets(enemy){
        let i=0;
        while(i<this.bullets.length){
            if(enemy.getDamages(this.bullets[i])){
                this.bullets.splice(i,1);
            }
            else{
                i++;
            }
            
        }
    }
}