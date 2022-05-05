const cellSize = 48;
const BlockMap = {
    grid : [],
    width :  Math.ceil(canvas.width / cellSize)+12,
    height : Math.ceil(canvas.height / cellSize)+5, 
    outCol : "#144e14",
    filCol : "#008000",
    filCol2 : "#800000",
    draw(fill){
        // Just shows the grid
        ctx.beginPath();

        // Setup color
        ctx.strokeStyle = this.outCol;

        for (i=0;i<this.grid.length;i++){
            // Outline
            for (j=0;j<this.grid[i].length;j++){
                ctx.rect(cellSize*i,cellSize*j,cellSize*(i+1),cellSize*(j+1));
                // If there's something inside
                if (fill == true){
                    let len = this.grid[i][j].length;
                    if (len == 1) {
                        ctx.fillRect(cellSize*i,cellSize*(j-3),cellSize,cellSize);
                        ctx.fillStyle = this.filCol; 
                    } else
                    if (len > 1) {
                        // This doesn't highlight the box for some reason, maybe it's a problem?
                        ctx.fillRect(cellSize*i,cellSize*(j-3),cellSize,cellSize);
                        ctx.fillStyle = this.filCol2;
                    }
                }
                ctx.font = "12px Arial";
                ctx.fillText(this.grid[i][j], cellSize*i, cellSize*(j-3));
        }
            
        }
        ctx.stroke();
    },
    makeGrid(){
        // Make 1d array, then covert to 2d
        for (i=0;i<this.width;i++){
            this.grid.push([]);
            for(j=0;j<this.height;j++){
                this.grid[i].push([]);
            }
        }
        

    }
}

BlockMap.makeGrid();
// console.log(BlockMap.grid);

function gridLoc(coord,width,dir){
    if (dir == 0)    return Math.floor(coord-width/cellSize);
    else            return Math.floor(coord+width/cellSize);
}
function gridLocObj(o,dir = 0,axis = "x"){
    let width = o.size / 2;
    if (dir == 0) width *=-1;

    let out;
    if (axis == "x"){
        out = o.x;
    } else {
        out = o.y;
    }

    out = Math.floor((out+width)/cellSize);
    return out;
}
function gridLocs(o){
    // Return a 4 array of x,y strings
    let out = "";
    out+=(gridLocObj(o,0,"x")+"-"+gridLocObj(o,0,"y"))+","; // Top Left 
    out+=(gridLocObj(o,1,"x")+"-"+gridLocObj(o,0,"y"))+","; // Top Right
    out+=(gridLocObj(o,0,"x")+"-"+gridLocObj(o,1,"y"))+","; // Bottom Left
    out+=(gridLocObj(o,1,"x")+"-"+gridLocObj(o,1,"y")); // Bottom right

    return out;
}
function parseStrCell(input,ind){
    // find the ,:nthoftype(ind) not sure how else to explain that 
    // find start and end
    let start; let end;
    if (ind == 0){
        start = 0;
        end = input.indexOf(",");
    } else {
        let len = input.length;
        let comma = 0;
        for (let i = 0; i < len; i++){
            // console.log(input.charAt(i))
            if (input.charAt(i) == ","){
                comma++;
                if (comma == ind) start = i+1;
                if (comma == ind+1) end = i;
            } 
        }
        // console.log(input.slice(start,end))
        // console.log(comma);
    }

    return input.slice(start,end);
}
function parseCellArr(input){
    // Takes a cell string ("2-0,2-0,2-1,2-2") and converts it to an array (["2-0"],["2-0"]...)
    // Currently runs on a constant of 4, could run on a variable based on input
    let out = []
    for (let i = 0; i < 4 ; i ++){
        out.push(parseStrCell(input,i));
    }
    return out;
}
function parseArrInt(arr,ind,axis = "x"){
    let str = arr[ind];
    if (axis == "x"){
        let end = str.indexOf("-");
        str = parseInt(str.slice(0,end));
        if (isNaN(str)) str = 0;
    } else {
        let start = str.indexOf("-");
        str = parseInt(str.slice(start+1));
        str += 3;
        if (isNaN(str)) str = 0;
    }
    return str;
}
function parseCellArrSingle(input,cell){
    let cells = parseCellArr(input);
    let cellX = parseArrInt(cells,cell,"x");
    let cellY = parseArrInt(cells,cell,"y");
    return [cellX,cellY];
}

function spawnCell(obj){
    // Gets the spawn location and turns it into cell data
    

    let cellX = Math.floor(obj.x/cellSize);
    let cellY = Math.floor(obj.y/cellSize);

    out = cellX + "-" + cellY;
    return out;
}