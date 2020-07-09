import { sum } from "../src/sum";

describe("testing that the sum of 2 numbers is correct (test to make sure ts-jest can import and test TS functions)", () => {
    it("2 + 2 = 4", () => {
        expect(sum(2, 2)).toBe(4);
    });
});
