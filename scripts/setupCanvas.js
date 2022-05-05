//Set up the canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
function setupCanSize(hei){
    canvas.height = hei;
    canvas.width = Math.floor(hei / 0.75);
}
setupCanSize(700);

function getMousePos(canvas, evt){
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
const mouseCont = {
    x : 0,
    y : 0,
}
canvas.addEventListener("mousemove",(evt)=>{
    let mousePos = getMousePos(canvas, evt);
    mouseCont.x = mousePos.x; mouseCont.y = mousePos.y;
});