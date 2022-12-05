const LOWERCASE_CHAR_CODE_OFFSET = 96;
const UPPERCASE_CHAR_CODE_OFFSET = 64 - 26;

export const analyse: (input: string) => number = (input: string) => {
    if(input.length == 0)
        return 0

    
    var priorityOfDuplicatedItems = 0
    var satchels = input.split("\n")
    for(var satchel of satchels){
        var firstCompartment = new Set<string>()
        var secondCompartment = new Set<string>()
        const compartmentSize = satchel.length/2
        for(let i = 0; i < compartmentSize; i++){
            firstCompartment.add(satchel[i])
            secondCompartment.add(satchel[i + compartmentSize])
        }
        var duplicated = ""
        for(let member of firstCompartment){
            if(secondCompartment.has(member)){
                duplicated = member
                break
            }
        }
           
        const rawCharCode =  duplicated.charCodeAt(0)
        var priority = rawCharCode > LOWERCASE_CHAR_CODE_OFFSET 
            ? rawCharCode - LOWERCASE_CHAR_CODE_OFFSET 
            : rawCharCode - UPPERCASE_CHAR_CODE_OFFSET
        priorityOfDuplicatedItems += priority
    }

    return priorityOfDuplicatedItems
}