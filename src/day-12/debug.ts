import { Coordinate, Map } from "."

export const debugDrawPath = (path: Coordinate[], map: Map) => {
    var arrays = []
    for(var i = 0; i < map.y; i++){
        arrays.push(new Array(map.x).fill("."))
    }
    var rows = []
    for(var i = 0; i < path.length - 1; i++){
        var marker = getDirectionMarker(path, i, i+1)
        var temp = arrays[path[i].y]
        temp[path[i].x] = marker
        arrays[path[i].y] = temp
    }

    for(var array of arrays){
        var row = array.join("")
        rows.push(row)
    }
    var drawnMap = rows.join("\n")

    console.log(drawnMap)
}

const getDirectionMarker = (path, i, j) => {
    if(path[i].y == path[j].y - 1){
        return "V"
    }
    if(path[i].y == path[j].y + 1){
        return "^"
    }
    if(path[i].x == path[j].x - 1){
        return ">"
    }
    if(path[i].x == path[j].x + 1){
        return "<"
    }
}