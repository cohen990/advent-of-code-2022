import { debugDrawPath } from "./debug"

export const shortestPath: (input: string) => number = (input: string) => {
    input = input.trim()
    var map = new Map(input)
    var start = map.getStart()
    var end = map.getEnd()

    var tree = {root: new SearchNode(0, start)}
    var current = start
    var moves = 0
    var currentNode = tree.root
    var shortestPath = Infinity
    var path = []
    var shortestPathTaken

    while(true){
        path.push(current)
        var validMoves = map.getValidMoves(current)
        map.markVisited(current)
        if(validMoves.length === 0){
            while(currentNode && currentNode.unexploredPaths.length === 0){
                currentNode = currentNode.parent
                if(currentNode)
                    currentNode.unexploredPaths = currentNode.unexploredPaths.filter(x => map.lookUp(x) !== "~")
            }
            if(!currentNode)
                break
            validMoves = currentNode.unexploredPaths
            moves = currentNode.depth
            path = currentNode.pathTaken
            if(currentNode.unexploredPaths.length === 1){
                currentNode.unexploredPaths = []
            }
        }
        if(validMoves.length === 1){
            choice = validMoves[0]
            moves ++
        }
        if(validMoves.length > 1){
            var newNode = new SearchNode(moves, current)
            newNode.parent = currentNode
            newNode.unexploredPaths.push(...validMoves)
            newNode.pathTaken = path.slice()
            currentNode.children.push(newNode)
            currentNode = newNode
            var {choice, choiceIndex} = getPathClosestToEnd(currentNode.unexploredPaths, end)
            currentNode.unexploredPaths = removeAtIndex(currentNode.unexploredPaths, choiceIndex)
            moves ++
        }
        current = choice
        if(current.equals(end)){
            if(moves < shortestPath) {
                shortestPath = moves
                shortestPathTaken = path
            }
            
        }
        if(moves > input.length)
            throw new Error("Searched too long. Failed to find a path")
    }

    if(shortestPath === Infinity){
        throw new Error("No paths were found")
    }

    debugDrawPath(shortestPathTaken, map)
    return shortestPath
}

function getPathClosestToEnd(validMoves: Coordinate[], end: Coordinate) {
    var minDistance = Infinity
    var choice
    var choiceIndex
    for(var moveIndex in validMoves){
        var distance = validMoves[moveIndex].distanceTo(end)
        if(distance < minDistance) {
            choice = validMoves[moveIndex]
            choiceIndex = moveIndex
            minDistance = distance
        }
    }

    return {choice, choiceIndex}
}

function removeAtIndex<T>(array: T[], index: number): T[]{
    var result = array.slice(0, index)
    result.push(...array.slice(index + 1))
    return result
}

export class Map {
    x: number
    y: number
    rawStrippedMap: string

    constructor(mapString: string){
        var rows = mapString.split("\n")
        this.x = rows[0].length
        this.y = rows.length
        this.rawStrippedMap = mapString.replace(/\n/g, "")
    }

    getCoordinate(index: number): any {
        return new Coordinate(index % this.x, Math.floor(index / this.x))
    }

    getStart(){
        return this.getCoordinate(this.rawStrippedMap.indexOf("S"))
    }

    getEnd(){
        return this.getCoordinate(this.rawStrippedMap.indexOf("E"))
    }

    getValidMoves(coordinate: Coordinate) {
        if(this.lookUp(coordinate) === "E"){
            return []
        }

        var upCoord = coordinate.add(0, -1)
        var downCoord = coordinate.add(0, 1)
        var leftCoord = coordinate.add(-1, 0)
        var rightCoord = coordinate.add(1, 0)
        var current = this.lookUpHeight(coordinate)
        var down = this.lookUpHeight(downCoord)
        var up = this.lookUpHeight(upCoord)
        var right = this.lookUpHeight(rightCoord)
        var left = this.lookUpHeight(leftCoord)

        var result = []
        if(down && down <= current + 1) result.push(downCoord)
        if(up && up <= current + 1) result.push(upCoord)
        if(left && left <= current + 1) result.push(leftCoord)
        if(right && right <= current + 1) result.push(rightCoord)

        return result
    }

    lookUpHeight(coordinate: Coordinate) {
        var square = this.lookUp(coordinate)

        if(square === undefined){
            return
        }

        if(square === "S")
            square = "a"
        if(square === "E")
            square = "z" 
        if(square === "~")
            return

        return square.charCodeAt(0) - 96
    }

    lookUp(coordinate: Coordinate) {
        var index = coordinate.x + coordinate.y * this.x
        var square = this.rawStrippedMap[index]
        return square
    }

    markVisited(coordinate: Coordinate) {
        if(this.lookUp(coordinate) === "E"){
            return
        }
        var index = coordinate.x + coordinate.y * this.x
        this.rawStrippedMap = this.rawStrippedMap.substring(0, index) + "~" + this.rawStrippedMap.substring(index + 1);
    }
}

export class Coordinate {
    x: number
    y: number

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }

    add(x: number, y: number): Coordinate {
        return new Coordinate(this.x + x, this.y + y)
    }

    equals(other: Coordinate): boolean {
        return this.x === other.x && this.y === other.y
    }

    distanceTo(other: Coordinate): number {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2)
    }
}

class SearchNode {
    depth: number
    coordinate: Coordinate
    unexploredPaths: Coordinate[]
    children: Array<SearchNode>
    parent: SearchNode
    pathTaken: Coordinate[]

    constructor(depth: number, coordinate: Coordinate) {
        this.depth = depth;
        this.coordinate = coordinate
        this.unexploredPaths = []
        this.children = []
    }
}