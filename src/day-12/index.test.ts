import { shortestPath, Map, Coordinate } from "."

describe("acceptance test", () => {
    var testData = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

    it("should find the shortest path", () => {
        expect(shortestPath(testData)).toBe(31)
    })
})

describe("unit tests: When finding the shortest paths", () => {
    it("Should return 25 if the path is a straight line", () => {
        expect(shortestPath("SbcdefghijklmnopqrstuvwxyE")).toBe(25)
    })

    it("Should return 26 if there is a single duplicated elevation", () => {
        expect(shortestPath("SabcdefghijklmnopqrstuvwxyE")).toBe(26)
    })

    it("Should return 25 if there is a straight line and also a bottom path that is too high", () => {
        expect(shortestPath("SbcdefghijklmnopqrstuvwxyE\nzzzzzzzzzzzzzzzzzzzzzzzzz")).toBe(25)
    })

    it("Should return 26 if the end is on the row below the start", () => {
        expect(shortestPath("Sbcdefghijklmnopqrstuvwxyz\nabcdefghijklmnopqrstuvwxyE")).toBe(26)
    })

    it("Should return 26 if the end is on the row below the start", () => {
        expect(shortestPath("Sbcdefghijklmnopqrstuvwxyz\nabcdefghijklmnopqrstuvwxyE")).toBe(26)
    })

    it("Should find a path if the path winds back on itself", () => {
        var input = 
`Saaaaaaaaaaaaaaaaaaaaaaaa
Eyxwvutsrqponmlkjihgfedcb
`
        expect(shortestPath(input)).toBe(49)
    })

    it("Should be able to escape a dead end", () => {
        var input = `
Saaaaaaaaaaaaaaaaaaaaaaaa
Ezzzzzzzzzzzzzzzzzzzccccb
zzyxwvutsrqponmlkjihgfedc
`
        expect(shortestPath(input)).toBe(51)
    })

    it("Should not climb in twos", () => {
        var inputThatSkipsF = `
SabcdeghijklmnopqrstuvwxyE
`
        var error;

        try{
            shortestPath(inputThatSkipsF)
        }
        catch(e){
            error = e
        }
        
        expect(error).toBeDefined()
    })

    it("Should be able to escape a nested dead end", () => {
        var input = `
Saaaaaaaaaaaaaaaaaaaaaaaa
Ezzzzzzzzzzzzzzzzzccccccb
zzzzzzzzzzzzzzzzzeeedzzzb
zzyxwvutsrqponmlkjihgfedc
`
        expect(shortestPath(input)).toBe(53)
    })

    it("Should select the shorter of two paths when two paths exist", () => {
        var input = `
Sbcdefghijklmnopqrstuvvwx
Eyx~xxx~xxx~xxx~xxx~xxx~x
z~xxx~xxx~xxx~xxx~xxx~xxx
z~~~~~~~~~~~~~~~~~~~~~~~y
zzzzzzzzzzzzzzzzzzzzzzzzz
`
        expect(shortestPath(input)).toBe(55)
    })
})

describe("unit tests: When finding the distance between coordinates", () => {
    it("should return perfect pythagorean triples", () => {
        var a = new Coordinate(0, 0)
        var b = new Coordinate(3, 4)

        expect(a.distanceTo(b)).toEqual(5)
    })

    it("should have the closer one have a smaller distance", () => {
        var a = new Coordinate(0, 0)
        var b = new Coordinate(3, 4)
        var c = new Coordinate(5, 6)

        var aToC = a.distanceTo(c)
        var bToC = b.distanceTo(c)
        
        expect(bToC).toBeLessThan(aToC)
    })
})

describe("unit tests: When converting to coordinates in a map", () => {
    it("Should return 0, 0 when converting 0", () => {
        var map = new Map("a")
        expect(map.getCoordinate(0)).toMatchObject({x: 0, y: 0})
    })

    it("Should return 1, 0 when converting 1", () => {
        var map = new Map("aa\naa")
        expect(map.getCoordinate(1)).toMatchObject({x: 1, y: 0})
    })

    it("Should return 0, 1 when converting 2", () => {
        var map = new Map("aa\naa")
        expect(map.getCoordinate(2)).toMatchObject({x: 0, y: 1})
    })

    it("Should return 0, 1 when converting 2", () => {
        var map = new Map("aaa\naaa\naaa")
        expect(map.getCoordinate(6)).toMatchObject({x: 0, y: 2})
    })
})

describe("unit tests: When looking up the height of a coordinate", () => {
    var map = new Map("abc\ndef\nghi")
    it("should return 1 when asked for 0,0", () => {
        expect(map.lookUpHeight(new Coordinate(0, 0))).toBe(1)
    })
    it("should return 6 when asked for 2,1", () => {
        expect(map.lookUpHeight(new Coordinate(2, 1))).toBe(6)
    })

    it("should return undefined when asked for 5,5", () => {
        expect(map.lookUpHeight(new Coordinate(5, 5))).toBeUndefined()
    })

    it("should return 1 when it's an S", () => {
        expect(new Map("S").lookUpHeight(new Coordinate(0, 0))).toBe(1)
    })

    it("should return 26 when it's an E", () => {
        expect(new Map("E").lookUpHeight(new Coordinate(0, 0))).toBe(26)
    })

    it("should return NaN when it's a tilde", () => {
        expect(new Map("~").lookUpHeight(new Coordinate(0, 0))).toBeUndefined()
    })
})

describe("unit tests: When getting valid moves", () => {
    it("Should return down and right when in the top left corner and both moves are valid", () => {
        var map = new Map("aa\naa")
        var validMoves = map.getValidMoves(new Coordinate(0, 0))
        expect(validMoves[0]).toMatchObject(new Coordinate(0, 1))
        expect(validMoves[1]).toMatchObject(new Coordinate(1, 0))
    })

    it("Should return up and left when in the bottom right corner and both moves are valid", () => {
        var map = new Map("aa\naa")
        var validMoves = map.getValidMoves(new Coordinate(1, 1))
        expect(validMoves[0]).toMatchObject(new Coordinate(1, 0))
        expect(validMoves[1]).toMatchObject(new Coordinate(0, 1))
    })

    it("Should return down when in the top left corner and right is too high", () => {
        var map = new Map("af\naa")
        var validMoves = map.getValidMoves(new Coordinate(0, 0))
        expect(validMoves[0]).toMatchObject(new Coordinate(0, 1))
    })
})

describe("unit tests: When making a map", () => {
    it("should strip all the newlines", () => {
        var map = new Map("alsdfn\nawoeira\naosdifjj\naldsfj")
        expect(map.rawStrippedMap.indexOf("\n")).toBe(-1)
    })
})

describe("submission: When submitting the answer", () => {
    var input = `
abcccccccccaaaaaaaaaaccccccccccccaaaaaaaaccaaccccccccccccccccccccccccccccccccccccccccccccaaaaaa
abccccccccccaaaaaaaaaccccccccccccaaaaaaaaaaaacccccccccccaacccacccccccccccccccccccccccccccaaaaaa
abcccccccccccaaaaaaacccccccccccccaaaaaaaaaaaaaacccccccccaaacaacccccccccaaaccccccccccccccccaaaaa
abccccccccccaaaaaaccccccccccccccaaaaaaaaaaaaaaaccccccccccaaaaaccccccccccaaacccccccccccccccccaaa
abccccccccccaaaaaaaccccccccccccaaaaaaaaaaaaaacccccccccccaaaaaacccccccccaaaacccccccccccccccccaac
abaaccaaccccaaccaaaccccccccaaaaaaaaaaaaaaacaaccccccccccaaaaaaaacccccccccaaalcccccccccccccccaaac
abaaaaaacccccccccaaccccccccaaaaaacccaaaacccaaccccccccccaaaaaaaaccccccccalllllllcccccccccccccccc
abaaaaaacccccccaaacccccccccaaaaccccccaaaccccaaaaacccccccccaacccccccaaaakllllllllcccccccaacccccc
abaaaaaacccccccaaaacccccccccaacccccccaaaccccaaaaacccccccccaacccccccaakkklllpllllccccacaaacccccc
abaaaaaaaccccccaaaaccccaaccccccccccccccccccaaaaaaccccccccccccccccccckkkkpppppplllcccaaaaaaacccc
abaaaaaaacaaaccaaaaccaaaaaaccccccccccccccccaaaaaacccccccaaaccccckkkkkkkpppppppplllcddaaaaaacccc
abcaaaacccaacccccccccaaaaaacccccaaaccccccccaaaaaacccccccaaaaccjkkkkkkkpppppuppplmmdddddaaaccccc
abccaaaaaaaaaccccccccaaaaaaccccaaaaaacccccccaaacccccccccaaaajjjkkkkkrpppuuuuupppmmmdddddacccccc
abccccaaaaaaaacccccccaaaaacccccaaaaaacccccccccccccccccccaaacjjjjrrrrrrppuuuuupqqmmmmmddddaccccc
abccccaaaaaaaaacccccccaaaacccccaaaaaaccccccccccccccccccccccjjjrrrrrrrrpuuuxuvvqqqmmmmmddddccccc
abccccaaaaaaaaacccccccccccccccccaaaaaccccaacccaccccccccaaccjjjrrrruuuuuuuxxyvvqqqqqmmmmmdddcccc
abccccaaaaaaaacccccccccaaaccccccaacaaccccaaacaacccaaacaaaccjjjrrrtuuuuuuuxxyvvvqqqqqmmmmdddcccc
abccaaaaaaaacccccccccccaaaaaccccccccccccccaaaaacccaaaaaaaccjjjrrttttxxxxxxyyvvvvvqqqqmmmmdeeccc
abccaaaccaaaccccccccaacaaaaacccccccccccccaaaaaacccaaaaaacccjjjrrtttxxxxxxxyyvvvvvvvqqqmmmeeeccc
abaaaaaaaaaacccaaaccaaaaaaaaaaaccaaaccccaaaaaaaacccaaaaaaaajjjqqrttxxxxxxxyyyyyyvvvqqqnnneeeccc
SbaaaaaaaaccccaaaaccaaaaaaaaaaaaaaaaacccaaaaaaaaccaaaaaaaaacjjjqqtttxxxxEzzyyyyvvvvqqqnnneeeccc
abcaaaaaacccccaaaaccccaaaaaaaccaaaaaaccccccaaccccaaaaaaaaaaciiiqqqtttxxxyyyyyyvvvvrrrnnneeecccc
abcaaaaaacccccaaaacccaaaaaaaaccaaaaaaccccccaaccccaaacaaacccciiiqqqqttxxyyyyyywvvvrrrnnneeeecccc
abcaaaaaaccccccccccccaaaaaaaaacaaaaacccccccccccccccccaaaccccciiiqqtttxxyyyyyywwrrrrnnnneeeccccc
abcaaacaacccccaacccccaaaaaaaaacaaaaacccccccccccccccccaaaccccciiiqqttxxxywwyyywwrrrnnnneeecccccc
abccccccccaaacaaccccccccccacccccccccccccccccccccccccccccccccciiqqqttxxwwwwwwywwrrrnnneeeccccccc
abccaacccccaaaaaccccccccccccccccccccccccccccccccccccccccaacaaiiqqqttwwwwsswwwwwrrrnnfffeccccccc
abaaaaccccccaaaaaacccccccccccccccccccccccccccccaaaccccccaaaaaiiqqqttssssssswwwwrrronfffaccccccc
abaaaaaacccaaaaaaacccccccccccccccccccccccccccaaaaaacccccaaaaaiiqqqssssssssssswrrrooofffaaaacccc
abaaaaaaccaaaaaacccccccccccccccccccccccccccccaaaaaacccccaaaaaiiqqqppssspppssssrrrooofffaaaacccc
abaaaaaaccaacaaacccccccccccccccccccccccccccccaaaaaacccccaaaaaiihpppppppppppossrrooofffaaaaacccc
abaaaaccccccccaacccccccccccccccccccccccccccccaaaaaccccccccaaahhhhppppppppppoooooooofffaaaaccccc
abaaaaccccccccccaacccccccccccccccccaaacccccccaaaaacccccccccccchhhhhhhhhhggpoooooooffffaaaaccccc
abccaacccccccacaaaccccccccccccccccaaaaacccccccccccccccccccccccchhhhhhhhhggggoooooffffaacaaacccc
abccccccccccaaaaacaaccccccccccccccaaaaaccccccccccccccccccccccccchhhhhhhhggggggggggffcaacccccccc
abccccccccccaaaaaaaaccccccccccccccaaaacccaacccccccccccaccccccccccccccaaaaaggggggggfcccccccccccc
abccccccccccccaaaaaccccaacccccccccaaaacaaaaccccccccaaaaccccccccccccccaaaacaaagggggcccccccccaccc
abcccccccccccaaaaacccccaacccccccccaaaaaaaaaccccccccaaaaaaccccccccccccaaaccaaaacccccccccccccaaac
abcccccccccccaacaaccaaaaaaaacccaaaaaaaaaaaccccccccccaaaaccccccccccccccaccccaaacccccccccccccaaaa
abccccccccccccccaaccaaaaaaaaccaaaaaaaaaaaccccccccccaaaaacccccccccccccccccccccacccccccccccccaaaa
abccccccccccccccccccccaaaaacccaaaaaaaaaaaacccccccccaacaacccccccccccccccccccccccccccccccccaaaaaa`
    it("should get the correct answer", () => {
        expect(shortestPath(input)).toBe(754)
    })
})