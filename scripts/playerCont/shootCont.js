function playerShootCont(o){
    if (keypress[4] == true){
        if (o.bCounter == 0){
            makeObj("bullet1",o.x,o.y);
            o.bCounter = 10;
        }
        if (o.rCounter == 0){
            makeObj("rocket1",o.x,o.y);
            o.rCounter = 30;
        }
    }

    if (o.bCounter > 0) o.bCounter --;
    if (o.rCounter > 0) o.rCounter --;
}
