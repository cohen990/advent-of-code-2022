import { mostCalories } from ".";

describe("When testing the example", () => {
    const testData =
        `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

    it("should recognise that the elf with the most calories is carrying 24000 calories", () => {
        expect(mostCalories(testData)).toBe(24000);
    })
})

describe("Calculating the elf with the most calories", () => {
    it("Should find 0 if there are no elves", () => {
        expect(mostCalories("")).toBe(0)
    })

    it("Should find 1000 if there is only one elf with 1000 calories", () => {
        expect(mostCalories("1000")).toBe(1000)
    })

    it("Should find 2000 if there are two elves with 1000 calories and 2000 calories", () => {
        expect(mostCalories("1000\n\n2000")).toBe(2000)
    })

    it("Should find 3000 if there are two elves with 3000 calories and 2000 calories in total", () => {
        expect(mostCalories("1000\n2000\n\n2000")).toBe(3000)
    })
})