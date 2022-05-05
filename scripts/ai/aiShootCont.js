function aiShootBullet(o,timing){
    if (o.bulletCounter == undefined) o.bulletCounter = 0; // Saves a messy declaration

    if (o.bulletCounter % timing == 0){
        makeObj("bullet2",o.x,o.y);
        o.bulletCounter = 0;
    }
    o.bulletCounter ++;
}
