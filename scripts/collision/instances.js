function collisionRect(obj1,obj2,threshold = 32){
    // Compares the x then y of 2 objects
    // returns true if they're colliding within the threshold
    let distance = Math.abs(obj1.x - obj2.x);
    if (distance < threshold){
        distance = Math.abs(obj1.y - obj2.y);
        if (distance < threshold) return true;
    }
}