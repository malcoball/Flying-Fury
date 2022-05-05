function saveScore(input){
    let save = JSON.stringify(input);
    localStorage.setItem("hiScore", JSON.stringify(input));
}

function loadScore(){
    var storedNames = JSON.parse(localStorage.getItem("hiScore"));
    return storedNames;
}