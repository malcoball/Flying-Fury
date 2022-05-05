let Objects = []
let instanceNumber = 10; 
// Make generic obj
class object {
    constructor(x, y, xSpd, ySpd,Spd, angle, size, dmg, health,spriteIndex,type,explode,score) {
        this.x = x
        this.y = y
        this.xSpd = xSpd
        this.ySpd = ySpd
        this.Spd = Spd // Max speed
        this.angle = angle
        this.size = size
        this.dmg = dmg
        this.health = health
        this.spriteIndex = spriteIndex
        this.type = type
        this.explode = explode
        this.score = score
        
        // Generic properties

        this.instance = instanceNumber
        Objects.push(this)
        instanceNumber++;
        this.imageIndex = 0;
        this.spriteLength = this.spriteIndex.length-1;
        this.state = "normal";
        this.counter = 0;
        this.cols =[this.type]; // list of things to NOT collide with
        this.kill = false // When true, gets deleted new frame
        this.imageSpeed = 6; // How many tics it takes for the sprite to change
        this.imageTic = 0;
        // this.hit = false; // Makes sure the hit event doesn't repeat every collision, maybe

        
        // specific spawn options, based of type only
        switch(this.type){
            case "player":
                this.cols.push("pProjectile");
                this.dmgSprs = [sPl00,sPl01,sPl02,sPl03];
                this.dmgIndex = 0;
                break;

            case "pProjectile":
                this.cols.push("player");
                this.cols.push("explosion1");
                this.cols.push("eProjectile");
                break;
                case "eProjectile":
                this.cols.push("pProjectile");
                this.cols.push("enemy");
                this.cols.push("explosion1");
                break;
            case "enemy" :
                let speedBoost = 5;
                if (gameController.difficulty < speedBoost) speedBoost = gameController.difficulty;
                this.Spd += speedBoost;
                this.cols.push("eProjectile");
                this.cols.push("explosion1");
                break;
            case "explosion2" : // This might work better as a particle
                this.cols.push("eProjectile");
                this.cols.push("explosion1");
                this.cols.push("player");
                this.cols.push("enemy");
            case "explosion1" :
                makeParticle(x,y,"explosion");
                break;
        }

        // Sets up up the grid work
        this.cell = spawnCell(this);
        if (this.size < cellSize) this.cellSize = 1;
        else this.cellSize = 4;
        this.gridCheck();

    }

    draw(){ // draw state
        ctx.save();                                                         // Saves everything about the canvas
        ctx.translate(this.x,this.y);                                       // Set the rotation point to the sprite
        ctx.rotate(this.angle * Math.PI/360);                               // Rotates to this.angle
        ctx.drawImage(this.spriteIndex[this.imageIndex],-this.size/2,-this.size/2,this.size,this.size); // Draws sprite
        ctx.restore();                                                      // Resets the canvas
    }
    step(){ // every tic
        // Maybe push these out to external files if it gets too big
       switch(this.type){
            case "player": 
                playerMoveCont(this);
                playerShootCont(this);
                // Clamp the movement
                // Moving left
                if (this.xSpd < 0){
                    if (this.x < this.size) this.xSpd = 1;
                } else 
                // Moving right
                if (this.xSpd > 0){
                    if (this.x > canvas.width - this.size) this.xSpd = -1;
                }

                // Moving up
                if (this.ySpd < 0){
                    if (this.y < this.size) this.ySpd = 1;
                } else 
                // Moving down
                if (this.ySpd > 0){
                    if (this.y > canvas.height - this.size) this.ySpd = -1;
                }


                // Counters
            break;
            
            case "pProjectile": // Player projectile behaviour
                if (this.aimed == true){
                    playerRoc1(this);
                } else {
                    playerBul1(this);
                }

            break;
            case "eProjectile" : 
                
            break
            case "ball":
                if (this.counter == 0){
                    console.log(this.angle);
                    this.counter ++;
                }

                break;
            case "enemy":
                switch(this.state){
                    case "normal":
                        aiMoveLeftBasic(this);                      
                        // aiMoveDownBasic(this);                      
                        break;
                    case "gotoCorner":
                        aiMoveToCorner(this);
                        aiShootBullet(this,30);

                        break;
                }
                // playerMoveCont(this)
                break;
            }
            
        // Actually move the object
        if (this.xSpd != 0){
            this.x += this.xSpd;
        }
        if (this.ySpd != 0){
            this.y += this.ySpd;
        }
        if ((this.ySpd != 0) || (this.xSpd != 0)){
            this.collision(); 
            this.gridCheck();
            this.offScreen();     
        }

        // Change the image currently shown, this will be stupidly fast at first though
        if (this.imageTic < this.imageSpeed){
            this.imageTic ++;
        } else {
            this.imageTic = 0;
        }
        if (this.imageTic == this.imageSpeed){
            if (this.imageIndex < this.spriteLength){
                this.imageIndex ++;
            } else {
                if (this.type == "explosion1") this.destroy();
                this.imageIndex = 0;
            }
        }

        // These happen every step just for testing
        // this.gridCheck("x");
        // this.gridCheck("y");
        // this.collision();

    }
    collision(){
        // Doesn't use precise collision, only if it's in the same cell.
        // See if anything else is in the same cell
        for (let i = 0; i < this.cellSize; i++){
            let cell = parseCellArrSingle(this.cell,i);
            cell = BlockMap.grid[cell[0]][cell[1]];
            if (cell.length > 1){
                // Something else in the grid
                // Get what it is
                for (let j = 0; j < cell.length; j ++){
                    let obj = getInstanceFromId(cell[j]);
                    if (obj.instance !== this.instance){
                        let match = false;
                        for (let ii = 0; ii < this.cols.length; ii ++){
                            // Go through all of the collision exceptions to see if the colliding object is in there
                            // If not, continue
                            if (obj.type == this.cols[ii]) match = true;
                        }
                        if (match == false){ // Colliding object is not an exception
                            if (collisionRect(this,obj) == true){
                                this.hitEvent();
                                obj.hitEvent();
                            }
                        }
                    }
                }
            }
        }
       
    }
    hitEvent(){
        makeParticle(this.x,this.y,"hitSpark");
        this.health --;
        if (this.dmgIndex !== undefined){
            this.dmgIndex++;
            this.spriteIndex = this.dmgSprs[this.dmgIndex];
        }
        if (this.health < 1) this.destroy();
    }
    gridCheck(){
        // When moving, check all 4 strings with tile
        // Get tile info as string ("2-4,3-4,2-5,3-5")
        let temp = gridLocs(this);
        if (temp != this.cell){ // When in a new cell
            // Add/remove cells to blockmap
            for (let i = 0; i < this.cellSize; i ++){ // Remove from blockmap
                let cells = parseCellArrSingle(this.cell,i);
                
                if (BlockMap.grid[cells[0]] != undefined){
                    BlockMap.grid[cells[0]][cells[1]] = removeFromObjArr(BlockMap.grid[cells[0]][cells[1]],this.instance);
                }
            }
            for (let i = 0; i < this.cellSize; i ++){ // Add to blockmap
                let cells = parseCellArrSingle(temp,i);
                
                if (BlockMap.grid[cells[0]] != undefined){
                    BlockMap.grid[cells[0]][cells[1]].push(this.instance);
                }

            }

            this.cell = temp; // Updates the objects internal cell info
        } 
        
    }
    destroy(){
        if (this.explode == true){
            makeObj("explosion1",this.x,this.y);
        }
        this.kill = true; // Marks it for deletion on the next frame
        let cells = parseCellArr(this.cell);
        for (let i = 0; i < 4; i ++){
            let cellX = parseArrInt(cells,i,"x");
            if (BlockMap.grid[cellX] != undefined){
                let cellY = parseArrInt(cells,i,"y");
                BlockMap.grid[cellX][cellY] = removeFromObjArr(BlockMap.grid[cellX][cellY],this.instance);
            }
        }
        // Update game score
        if (this.score > 0) gameController.update("score",this.score);

        // Create harmless explosion
        if (this.type == "bullet2"){
            makeObj("explosion2",this.x,this.y);
        }
        // Player died
        if (this.type == "player"){
            gameController.state = "gameOver";
        }
    }
    offScreen(){
        if ((this.x > canvas.width+(this.size*4)) || (this.x < -this.size) || (this.y < 0) || (this.y > canvas.height)){
            // Destroy the object once offscreen
            this.explode = false;
            this.destroy();
        }
    }
}

function objStepEvents(){
    ctx.globalAlpha = 1;
    Objects.forEach(object => object.draw());
    Objects.forEach(object => object.step());
    Objects = Objects.filter(object => !object.kill); // Deletes instances
}

function makeObj(obj,x,y){
    switch(obj){
        case "player" : // Main player object
            let player = new object(x,y,0,0,10,0,48,8,4,sPl00,"player",false,0); 
            player.bCounter = 0;
            player.rCounter = 0;
            break; 
        case "enemy1" : // Fighter enemy
            let enemy1 = new object(x,y,0,0,4,0,48,1,4,sEn00,"enemy",false,10); 
            enemy1.state = "normal";
            break; 
        case "enemy2" : // Inteceptor enemy
            let enemy2 = new object(x,y,0,0,2,0,48,1,4,sEn10,"enemy",false,20); 
            enemy2.state = "gotoCorner";
            break; 

        case "bullet1": 
            let bullet1 = new object(x,y,10 ,0,10,0,8,1,1,sBl00,"pProjectile",false,0); 
            bullet1.aimed = false;
            break; // Player bullet
        case "bullet2": 
            // let bullet2 = new object(x,y,10,0,10,0,8,1,1,sBl00,"eProjectile",false,0);
            let bullet2 = new object(x,y,-6,0,-6,180,8,1,1,sCN00,"eProjectile",false,0); 
            bullet2.aimed = false;
            break; // Player bullet

        case "rocket1": 
            let rocket1 = new object(x,y,0,0,10,0,8,1,1,sRK00,"pProjectile",true,0); 
            rocket1.Spd = 1;
            rocket1.aimed = true;
            rocket1.accel = 0.25;
            break; // Player rocket
        // Testing objects, could take them out but where's the fun in that?
        case "ball":
            let ball1 = new object(x,y,0,0,10,90,8,1,1,sBL00,"ball",false);
            // ball1.angle = Math.floor(Math.random()*360);
            ball1.angle = angleMouse(getInstanceFromId(10),mouseCont.x, mouseCont.y)+90;
            break;
        case "explosion1": // Damaging explosion
            let explodeSprs = [sEX00,sEX01,sEX02];
            explodeSprs = explodeSprs[irandom(1)]
            let explode1 = new object(x,y,0,0,0,0,48,1,99,explodeSprs,"explosion1",false,0);
            explode1.imageSpeed = 2;
            break;
        case "explosion2": // Damaging explosion
            let explode2 = new object(x,y,0,0,0,0,24,1,99,sEX10,"explosion2",false,0);
            explode2.imageSpeed = 2;
            break;
    }
}
function spawnEnemy(enemy,x = canvas.width, y = Math.round(Math.random()*canvas.height)){
    // Specific function, mostly just saves on typing
    switch(enemy){
        case 0 :
        case "enemy1":
        case "fighter":
            makeObj("enemy1",x,y);
            break;

        case 1 : 
        case "enemy2" :
        case "interceptor":
            makeObj("enemy2",x,y);
            break;
    }
}
function spawnSquad(getAmount = false,squad){
    if (getAmount == true) return 4; // Gets the amount of possible spawns
    // Spawns specific set of enemies, gives some control
    switch(squad){
        case 0 : 
            // Spawn 4 fighters at player's height, all at the same distance
            let i = -2;
            let yStart0 = getPlayerY()+24;
            while (i < 2) {
                spawnEnemy(0,canvas.width,yStart0+(48*i));
                i++;
            }
            break;
        case 1 :
            // Spawn 4 fighters top left -> bottom right
            let yStart1 = getPlayerY()+24;
            for (let i = -2 ; i < 2; i ++){
                spawnEnemy(0,canvas.width+(i*48),yStart1+(48*i));
            }
            break;
        case 2 :
            // Spawn 4 fighters top right -> bottom left
            let yStart2 = getPlayerY()-24;
            for (let i = -2 ; i < 2; i ++){
                spawnEnemy(0,canvas.width+(i*48),yStart2-(48*i));
            }
            break;
        case 3 :
            // Spawn 4 fighters top right -> bottom left
            for (let i = 0 ; i < 2; i++){
                spawnEnemy(0,canvas.width+(i*48),48*i+32);
                spawnEnemy(0,canvas.width+(i*48),canvas.height-48*i-32);
            }
            break;
        
    }
}
function getPlayerProp(){
    // Player should be at the start but loop through the objects just in case
    let out = canvas.height/2; // If player doesn't exist, spawn in the middle
    let len = Objects.length;
    for (let i = 0; i < len; i++){
        if (Objects[i].type == "player"){
            out = Objects[i];
            i = len;
        }
    }
    return out;
}
function getPlayerY(){
    return getPlayerProp().y;
}
function getPlayerX(){
    return getPlayerProp().x;
}

function getAngleOf(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    theta += 90;
    return theta;
  }