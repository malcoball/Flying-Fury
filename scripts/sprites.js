function newImage(src){
    var tmp = new Image();
    tmp.src = src;
    return tmp;
}
function newImages(fileName,fileType,imageAmount){
    // file name is the unique part to identify the sprite
    // images/pSpr1.png -> (fileName) = pSpr
    let strStart = "images/";
    let strEnd = "";
    let out = [];
    for (let i = 0; i < imageAmount; i++){
        strEnd = fileName + i + "."+fileType;
        out.push(newImage(strStart + strEnd));
    }
    return out;
}

// the number have value
// the first refers to a totally different sprite set, 0 can be enemy fighter then 1 would be enemy interceptor
// the second refers to how far in the set, 0 can be no damage then 3 would be very damaged

// Player sprites
const sPl00 = newImages("player/pSpr0","png",2);
const sPl01 = newImages("player/pSpr1","png",2);
const sPl02 = newImages("player/pSpr2","png",2);
const sPl03 = newImages("player/pSpr3","png",2);

const sEn00 = newImages("figSpr","png",2);
const sEn10 = newImages("intSpr","png",2);
const sEX00 = newImages("explosion/md0/","png",15);
const sEX01 = newImages("explosion/md1/","png",15);
const sEX02 = newImages("explosion/md2/","png",16);
const sEX10 = newImages("explosion/sm0/","png",11);
const sCN00 = newImages("canSpr","png",2);
const sBl00 = [newImage("images/sBul1.png")];
const sRK00 = [newImage("images/sRoc1.png")];
const sBL00 = [newImage("images/sBal1.png")];
