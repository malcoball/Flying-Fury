
// // Check distance;
function moveToPointX(o,xTarget,accel = true,stopDis){
    // accel controls whether it snaps at the speed or not
    if (Math.abs(o.x - xTarget) > 64){
        if (o.x > xTarget){ // Move left
            if (o.xSpd > -o.Spd){
                o.xSpd -= 1;
            }
        } else 
        if (o.x < xTarget){ // Move right
            if (o.xSpd < o.Spd){
                o.xSpd += 1;
            }
        }
    } else {
        o.xSpd = 0;
        return true;    
    }
}
function moveToPointY(o,yTarget,accel = true,stopDis){
    // accel controls whether it snaps at the speed or not
    if (Math.abs(o.y - yTarget) > 64){
        if (o.y > yTarget){ // Move left
            if (o.ySpd > -o.Spd){
                o.ySpd -= 1;
            }
        } else 
        if (o.y < yTarget){ // Move right
            if (o.ySpd < o.Spd){
                o.ySpd += 1;
            }
        }
    } else {
        o.ySpd = 0;
        return true;    
    }
}

function angleToSpd(o,axis = "x"){
    // Takes in a basic angle and outputs a multiplier for the speed, I think
    // Work out the angle
    angle = o.angle * Math.PI / 180;
    if (axis == "x"){
        return Math.sin(angle);
    } else {
        return -Math.cos(angle);
    }
}

function getSide(axis,o){
    // Car's gone for it's mot, wish it luck pls
    let mid = null;
    let out = null;
    if (axis == "x"){
        // Left or right?
        mid = canvas.width/2;
        if (o.x > mid)  out =  "right";
        else            out =  "left";
    } else {
        // top or bottom?
        mid = canvas.height/2;
        if (o.y < mid)  out =  "top";
        else            out =  "bottom";
    }

    return out;
}
