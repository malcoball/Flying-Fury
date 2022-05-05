let drawGrid = false;

function draw(){
    // Clear previous frame
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw the amount of instances 
    // const target = document.querySelector("#hiScore");
    // target.innerHTML = `<h5>${Objects.length}</h5><ul>`;

    if (drawGrid == true) BlockMap.draw(true);

    // Main events
    // BlockMap.draw(false);
    gameController.step();


    requestAnimationFrame(draw); // Recursion
}
draw();
function stopAll(){
    draw = null;
}
// Toggle the grid on/off
document.addEventListener("keypress",(e)=>{
    if ((e.key == "Z") || (e.key == "z")){
        if (drawGrid == false) drawGrid = true;
        else drawGrid = false;
    }
})