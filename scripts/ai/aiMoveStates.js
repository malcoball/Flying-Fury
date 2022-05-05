function aiMoveLeftBasic(o){
    // Just a basic loop that moves from right <- left
    // Init
    if (o.counter == 0){
        o.xTarget = -o.size;
    }
    if (moveToPointX(o,o.xTarget) == true){
        o.score = 0;
        o.destroy();
    }

}
function aiMoveDownBasic(o){
    // Just a basic loop that moves from right <- left
    // Init
    if (o.counter == 0){
        o.YTarget = 0;
    }
    moveToPointY(o,o.yTarget);
    if (Math.abs(o.y - o.yTarget) < 128){
        o.y = canvas.height - 128;
    }
}
function aiMoveToCorner(o){
    // Init
    if (o.counter == 0){
        if (getSide("y",o) == "top")     o.yTarget = o.size;
        else                                o.yTarget = canvas.height - o.size;
        if (getSide("x",o) == "right")   o.xTarget = canvas.width - o.size;
        else                                o.xTarget = o.size;
        o.counter ++;
    }

    if (moveToPointY(o,o.yTarget) == true){
        if (o.counter > 120){
            let randomPush = irandom(64);
            // Swap sides
            if (getSide("y",o) == "bottom") o.yTarget = o.size + randomPush;
            else o.yTarget = canvas.height - o.size - randomPush;
            o.counter = 1;
        }
        o.counter ++;
    }
}
