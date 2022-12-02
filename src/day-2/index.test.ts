import { evaluateStrategy, ENCODINGS } from "."

const them = ENCODINGS.them
const us = ENCODINGS.us

describe("When evaluating a strategy guide", () => {
    const testData =
        `A Y
B X
C Z`

    it("Should net you a score of 15", () => {
        expect(evaluateStrategy(testData)).toBe(15)
    })

    it("Should have a score of 0 if no games are played", () => {
        expect(evaluateStrategy("")).toBe(0)
    })

    it("Should have a score of 1 if losing with rock", () => {
        expect(evaluateStrategy(`${them.paper} ${us.rock}`)).toBe(1)
    })

    it("Should have a score of 2 if losing with paper", () => {
        expect(evaluateStrategy(`${them.scissors} ${us.paper}`)).toBe(2)
    })

    it("Should have a score of 3 if losing with scissors", () => {
        expect(evaluateStrategy(`${them.rock} ${us.scissors}`)).toBe(3)
    })

    it("Should have a score of 4 if drawing with rock", () => {
        expect(evaluateStrategy(`${them.rock} ${us.rock}`)).toBe(4)
    })

    it("Should have a score of 5 if drawing with paper", () => {
        expect(evaluateStrategy(`${them.paper} ${us.paper}`)).toBe(5)
    })

    it("Should have a score of 6 if drawing with scissors", () => {
        expect(evaluateStrategy(`${them.scissors} ${us.scissors}`)).toBe(6)
    })

    it("Should have a score of 7 if winning with rock", () => {
        expect(evaluateStrategy(`${them.scissors} ${us.rock}`)).toBe(7)
    })

    it("Should have a score of 8 if winning with paper", () => {
        expect(evaluateStrategy(`${them.rock} ${us.paper}`)).toBe(8)
    })

    it("Should have a score of 9 if winning with scissors", () => {
        expect(evaluateStrategy(`${them.paper} ${us.scissors}`)).toBe(9)
    })

    it("Should have a score of 2 if losing twice with rock", () => {
        expect(evaluateStrategy(`${them.paper} ${us.rock}\n${them.paper} ${us.rock}`)).toBe(2)
    })

})