function removeFromObjArr(arr,propValue){
    // Only works with instance currently, maybe change it if needed.
    let out = [];
    if (arr.length > 0){ // Something to delete
        // See if the instanceNumber is in the arr
        for (let i = 0; i < arr.length; i++){
            if (arr[i] !== propValue){ 
                out.push(arr[i]);
            }
        }
    }
    return out;
}

function getInstanceFromId(id, start = 0 , end = Objects.length){
    // Base condition
    if (start > end) return false;

    // Get the middle index
    let mid = Math.floor((start + end)/2);
    if (Objects[mid].instance === id) return Objects[mid];

    if (Objects[mid].instance > id){
        return getInstanceFromId(id,start,mid-1);
    } else 
        return getInstanceFromId(id,mid+1,end);

}

function irandom(int){
    return Math.round(Math.random()*int);
}