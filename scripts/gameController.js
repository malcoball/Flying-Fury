class hiScore{
    constructor(name,score){
        this.name = name;
        this.score = score;
    }
}

const gameController = {
    state : "newGame",
    counter : 0,
    score : 0,
    scores : [
        new hiScore("Ade",140),
        new hiScore("Joe",120),
        new hiScore("Mal",100),
        new hiScore("Swe",80),
        new hiScore("Aes",60),
        new hiScore("Min",40),
        new hiScore("Opa",20),
    ],
    txtX : 0,
    txtY : 0,
    difficulty : 0,
    scoreOut : document.querySelector("#scoreOut"),
    scoreOutMsg : "Current Score : ", // Saves me from retyping
    update(target,amount){
        switch(target){
            case "score" : 
            this.score += amount;
            scoreOut.innerHTML = "Current score : "+this.score;
                break;
        }
    },
    step(){
        switch(this.state){
            case "newGame":
                // Draw to screen
                
                this.drawNewGame();
                if (this.counter == 0){

                    this.hiScoreOut();
                    resetKeys();
    
                    // Init duh
                    canvas.addEventListener("mouseenter",()=>{
                        this.newGame();
                        if (this.state == "pause") this.state = "play";
                    })
                    canvas.addEventListener("mouseleave",()=>{
                        if (this.state == "play") this.state = "pause";
                    })
                    this.counter ++;
                }
                break;
            case "play" : 

                particleStepEvents();
                objStepEvents(false);

                // Time events
                this.counter ++;
                if (this.counter % 60 == 0){
                    this.difficulty ++;
                }

                // Spawn in enemies
                if (this.counter % 120 == 0){
                //    spawnEnemy(0)
                    let chose = this.fighterSquadNum();
                    spawnSquad(false,chose);
                }
                if (this.counter % 360 == 0){
                    spawnEnemy(1,canvas.width-64,64);
                    spawnEnemy(1,canvas.width-64,canvas.height-64);
                }
            break;
            case "pause" :
                objStepEvents(true);

                break;
            case "gameOver":
                this.hiScoreAdd();
                this.state = "newGame";
                break;
            case "debugParticle":
                if (this.counter % 30 == 0){
                    let xx = Math.round(Math.random()*canvas.width);
                    let yy = Math.round(Math.random()*canvas.height);
                    makeParticle(xx,yy,"hitSpark");
                    makeParticle(xx,yy,"explosion");
                }


                particleStepEvents();
                this.counter ++;
                break;

        }
    },
    newGame(){
            if (this.state == "newGame"){ // Prevents it from being ran when not needed
            // Deletes any left over objects, though they should already be gone
            Objects = [];
            particles = [];
            // Reset score
            this.score = 0;
            this.difficulty = 0;
            this.scoreOut.innerHTML = this.scoreOutMsg + this.score;
            // Spawn in player
            makeObj("player",128,canvas.height/2);
            // Move states
            this.state = "play";
        }
    },
    fighterSquadNum(){
        return Math.floor(Math.random()*spawnSquad(true));
    },
    hiScoreAdd(){
        // See if score is high enough to be on the board
        let len = this.scores.length;
        let place = len;
        if (this.score > this.scores[len-1].score){
            for(let i = 0; i < len; i++){
                // Starts at the top of the list
                if (this.score > this.scores[i].score){
                    place = i;
                    i = len;
                }
            }
            // alert("You placed "+(place+1));
            let name = prompt(`You came : ${place+1}!`);
            this.scores[place].score = this.score;
            this.scores[place].name = name;

            saveScore(this.scores);
            this.hiScoreOut();

        } else {
            alert("game over :(")
        }
    },
    hiScoreOut(){
        // Output highscore to DOM
        let out = document.querySelector("ol");
        let childs = document.querySelectorAll("ol li");
        let len = childs.length
        for (let i = 0; i < len; i++){
            childs[i].remove();
        }
        for (let i = 0; i < len; i++){
            let elm = document.createElement("li");
            elm.innerHTML = this.scores[i].name + " : " + this.scores[i].score;
            out.append(elm);
        }
    },
    hiScoreLoad(){
        let scores = loadScore();
        if (scores != null){
            this.scores = scores;
        }
    },
    drawNewGame(){
        // Hopefully get the space effect to screen
        screenSaver.step();

        // Basic text to screen
        let text = "Put mouse on screen to start";
        let size = 30;
        ctx.font = size+"px Arial";
        ctx.fillStyle = "black";

        // Make a little scroll effect
        ctx.fillText(text,this.txtX,this.txtY);
        this.txtY +=2;
        if (this.txtY > canvas.height){
            ctx.fillText (text,this.txtX,this.txtY-canvas.height);
            if (this.txtY > canvas.height + size) this.txtY = this.txtY-canvas.height;
        }

    },

}
gameController.hiScoreLoad();