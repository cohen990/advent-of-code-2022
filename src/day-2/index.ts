export const evaluateStrategy = (strategy: string) => {
    if (strategy.length == 0)
        return 0

    var games = strategy.split("\n")
    var score = 0

    for (var game of games) {
        var them = decrypt(game[0])
        var us = decrypt(game[2])

        if (weWin(us, them)) {
            score += choicePoints[us] + WIN_POINTS
            continue
        }

        if (weDraw(us, them)) {
            score += choicePoints[us] + DRAW_POINTS
            continue
        }

        score += choicePoints[us]
    }

    return score

}

function weWin(us: RockPaperScissors, them: RockPaperScissors) {
    return winsLookup[us] == them
}

function weDraw(us: RockPaperScissors, them: RockPaperScissors) {
    return us == them
}

export const ENCODINGS = {
    us: {
        rock: "X",
        paper: "Y",
        scissors: "Z",
    },
    them: {
        rock: "A",
        paper: "B",
        scissors: "C"
    }
}

enum RockPaperScissors {
    rock,
    paper,
    scissors
}

const decryptionTable = {}
decryptionTable[ENCODINGS.us.rock] = RockPaperScissors.rock
decryptionTable[ENCODINGS.us.paper] = RockPaperScissors.paper
decryptionTable[ENCODINGS.us.scissors] = RockPaperScissors.scissors
decryptionTable[ENCODINGS.them.rock] = RockPaperScissors.rock
decryptionTable[ENCODINGS.them.paper] = RockPaperScissors.paper
decryptionTable[ENCODINGS.them.scissors] = RockPaperScissors.scissors

const decrypt = (symbol: string) => decryptionTable[symbol]

const choicePoints = {}
choicePoints[RockPaperScissors.rock] = 1
choicePoints[RockPaperScissors.paper] = 2
choicePoints[RockPaperScissors.scissors] = 3

const winsLookup = {}
winsLookup[RockPaperScissors.rock] = RockPaperScissors.scissors
winsLookup[RockPaperScissors.paper] = RockPaperScissors.rock
winsLookup[RockPaperScissors.scissors] = RockPaperScissors.paper

const WIN_POINTS = 6
const DRAW_POINTS = 3