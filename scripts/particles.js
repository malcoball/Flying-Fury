let particles = [];
let sparkColors = ["#c7ebf0","#ccd8e0","#e5f09e","#dffabb","#faffeb","#fefffa"];
let explosionColors = ["#cca586","#d34f2e","#fd1b13","#b80000","#ff9393"];
class particle{ 
    // Making seperate from the object constructor as this doesn't need much to work,
    // Also it'll be drawn rather than using sprites, that doesn't make 100% sense but yea
    constructor(x,y,type){
        this.x = x
        this.y = y
        this.size = 2
        this.z = 1
        this.type = type
        this.col = this.getColor()
        this.grow = Math.round(Math.random()*4)/50;
        this.dir = Math.round(Math.random()*2)
        this.spd = Math.round(Math.random()*8);
        this.angle = Math.round(Math.random()*359)
        this.counter = 0
        this.countLimit = 10 + Math.round(Math.random()*40);
        this.kill = false;

        particles.push(this)

        
    }
    step(){
        // Add 2d movement
        this.x += angleToSpd(this,"x");
        this.y += angleToSpd(this,"y");
        // Add 3d movement
        switch(this.dir){
            case 0 : // Move away
                if (this.z > 0.1){
                    this.z -= this.grow;
                } else {
                    this.kill = true;
                }
                break;
            case 1 : // Move toward
                if (this.z < 3){
                    this.z += this.grow;
                } else{
                    this.kill = true;
                }
                break;
        }
        // Delete the little thing
        this.counter ++;
        if (this.counter == this.countLimit) this.kill = true;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size*this.z,0,2*Math.PI);
        ctx.fillStyle = this.col;
        ctx.fill();

    }
    getColor(){
        let arr = [];
        switch(this.type){
            case "hitSpark" : arr = sparkColors; break;
            case "explosion": arr = explosionColors; break;
        }
        let len = arr.length;
        let int = Math.round(Math.random()*len);
        return arr[int];
    }

}
function makeParticle(x,y,type){
    switch(type){
        case "hitSpark" : new particle(x,y,type); break;
        case "explosion": 
            let amount = 4 + Math.round(Math.random()*4);
            for (let i = 0; i < amount; i ++){
                new particle(x,y,type);
            }
            break;
    }
    
}
function particleStepEvents(){
    ctx.globalAlpha = 0.4;
    particles.forEach(object => object.draw());
    particles.forEach(object => object.step());
    particles = particles.filter(object => !object.kill); // Deletes instances
}