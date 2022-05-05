const screenSaver = {
    objects : [],
    growSpd : 0.75,
    moveSpd : 0,
    spawnAmount : 6,
    colors : [
        "#7fffd4","#87b1b3","#83868d"
    ],
    step(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // c.beginPath();
        screenSaver.objects.forEach(object => object.step());
        screenSaver.objects.forEach(object => object.draw());
        screenSaver.objects = screenSaver.objects.filter(object => !object.delete); // Deletes instances
    
        let randomNum = Math.round(Math.random()*this.spawnAmount);
        this.spawnObjs(randomNum,"star");
    },
    spawnObjs(amount){
        for(let i = 0; i < amount; i++){
            this.spawnObj();
        }
    },
    spawnObj(){
        // Set up the distance from the center, 
        let chose = irandom(1);
        // let xDis = irandom(Math.random(canvas.width/2));
        let xDis = irandom(canvas.width/2);
        if (chose == 1) xDis *= -1;
        let yDis = irandom(canvas.height/2);
        chose = irandom(1);
        if (chose == 1) yDis *= -1;
        let x = canvas.width/2 + xDis;
        let y = canvas.height/2 + yDis;

        let col = this.getColor();
        new star(x,y,col);
    },
    getColor(){
        let int = Math.floor(Math.random()*this.colors.length);
        let out = this.colors[int];
        return out;
    }
}

class star {
    constructor(x,y,col,type){
        this.x = x;
        this.y = y;
        this.z = 0;
        this.size = 32;
        this.angle = getAngleOf(canvas.width/2, canvas.height/2,this.x,this.y);
        this.col = col;
        this.spd = screenSaver.moveSpd;
        this.accel = 0.5;
        this.delete = false;
        screenSaver.objects.push(this);
    }

    step(){
        // Basic non-linear acceleration
        this.spd *= 1.1;
        this.spd += this.accel;
        // Move the thing
        this.x += angleToSpd(this)*this.spd;
        this.y += angleToSpd(this,"y")*this.spd;
        this.z += screenSaver.growSpd/100;

        // Delete when offscreen
        if ((this.x < 0) || (this.x > canvas.width) || (this.y < 0) || (this.y > canvas.height)){
            this.delete = true;
        }
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size*this.z,0,2*Math.PI);
        ctx.fillStyle = this.col;
        ctx.fill();
    }
}