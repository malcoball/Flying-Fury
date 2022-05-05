function playerBul1(){

}
function playerRoc1(obj){
    if (obj.counter == 0){
        obj.angle = getAngleOf(obj.x,obj.y,mouseCont.x,mouseCont.y);
        // obj.angle = getAngleOf(obj,0,0);
        obj.counter ++; // Only at begining because that only time it's needed
    }
    // if (this.Spd < 8) this.Spd += this.accel;
    // obj.Spd = 10;
    obj.xSpd += angleToSpd(obj,"x") * 0.25;
    obj.ySpd += angleToSpd(obj,"y") * 0.25;
    // obj.xSpd += obj.Spd * angleToSpd(obj,"x");
    // obj.ySpd += obj.Spd * angleToSpd(obj,"y");
}