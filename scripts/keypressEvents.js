let keypress = [];
function resetKeys(){
    keypress =  [
        false, // up    0
        false, // down  1
        false, // left  2
        false, // right 3
        false, // gun   4
        false, // rocket5
    ]
}
resetKeys();
function getKey(e){
    let int = null;
    // Go through key then keyCode for special cases
    switch(e.key){
        case "w" :      int = 0; break;
        case "s" :      int = 1; break;
        case "a" :      int = 2; break;
        case "d" :      int = 3; break;
        case "f" :      int = 5; break;
        //default: console.log(e.key);
    }
    if (int == null){
        switch(e.keyCode){
            case 32 : int = 4; break;
            case 16 : int = 5; break;
            //default: console.log(e.keyCode);
        }
    }
    return int;
}
document.addEventListener("keypress",(e)=>{
    int = getKey(e);
    keypress[int] = true;
})

document.addEventListener("keyup",(e)=>{
    keypress[getKey(e)] = false;
})

function show(){
    document.querySelector("h1").innerHTML = `${keypress}`;
    requestAnimationFrame(show);
}
// show();