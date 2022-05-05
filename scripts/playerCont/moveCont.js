function playerMoveCont(o){
    if (keypress[0] == true){ // Up
        if (o.ySpd > -o.Spd){
            o.ySpd --;
        }
    } else 
    if (keypress[1] == true){ // Dwn
        if (o.ySpd < o.Spd){
            o.ySpd ++;
        }
    }
    if (keypress[2] == true){ // Up
        if (o.xSpd > -o.Spd){
            o.xSpd --;
        }
    } else 
    if (keypress[3] == true){ // Dwn
        if (o.xSpd < o.Spd){
            o.xSpd ++;
        }
    }

    // Deccel
    if (keypress[0] == false){
        if (o.ySpd < 0){
            o.ySpd ++;
        }
    }
    if (keypress[1] == false){
        if (o.ySpd > 0){
            o.ySpd --;
        }
    }
    if (keypress[2] == false){
        if (o.xSpd < 0){
            o.xSpd ++;
        }
    }
    if (keypress[3] == false){
        if (o.xSpd > 0){
            o.xSpd --;
        }
    }
}