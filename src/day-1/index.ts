export const mostCalories = (elfList: string) => {
    if (elfList.length === 0) {
        return 0
    }

    var elves = elfList.split("\n\n")
    var max = -Infinity
    for (var elf of elves) {
        var currentElfList = elf.split("\n")
        var total = 0
        for (var calories of currentElfList) {
            total += parseInt(calories)
        }
        if (total > max) {
            max = total
        }
    }
    return max
}