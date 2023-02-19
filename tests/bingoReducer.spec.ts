import { bingoReducer } from "../src/bingoReducer"
import { BingoTicket } from "../src/types";

const initialState = {
    players: [],
    numbersDrawn: [],
    winners: [],
};

const ticket1: BingoTicket = [
    [10, 18, 42, 48, 73],
    [14, 30, 35, 53, 74],
    [8,  20,     47, 70],
    [7,  17, 36, 52, 68],
    [6,  24, 44, 59, 65],
];

const ticket2: BingoTicket = [
    [8,  21, 34, 48, 62],
    [10, 23, 35, 49, 68],
    [1,  25,     58, 72],
    [4,  19, 32, 46, 65],
    [14, 24, 31, 52, 66],
];

const ticket3: BingoTicket = [
    [1,  23, 36, 54, 67],
    [12, 26, 34, 56, 73],
    [11, 19,     50, 74],
    [9,  27, 37, 48, 64],
    [10, 20, 31, 46, 61],
];

// invalid ticket - numbers are not unique, some numbers are repeating
const invalidTicket: BingoTicket = [
    [1, 16, 36, 46, 61],
    [1, 17, 37, 47, 62],
    [1, 18,     48, 63],
    [1, 19, 38, 49, 64],
    [2, 20, 39, 50, 65],
];

describe("bingoReducer", () => {
    describe("registering players", () => {
        it("should register a player", () => {
            const action = { type: "registered", payload: { name: "karlis", ticket: ticket1 } } as const;
            const state = bingoReducer(initialState, action);

            expect(state.players).toContainEqual({ name: "karlis", ticket: ticket1 });
            expect(state).not.toBe(initialState); // verify that state was NOT mutated
        });

        it("should register multiple players", () => {
            const actions = ([
                { type: "registered", payload: { name: "karlis", ticket: ticket1 } },
                { type: "registered", payload: { name: "anna", ticket: ticket2 } },
                { type: "registered", payload: { name: "dan", ticket: ticket3 } },
            ] as const);

            const state = actions.reduce(bingoReducer, initialState);

            expect(state.players).toContainEqual({ name: "karlis", ticket: ticket1 });
            expect(state.players).toContainEqual({ name: "anna", ticket: ticket2 });
            expect(state.players).toContainEqual({ name: "dan", ticket: ticket3 });
            expect(state).not.toBe(initialState); // verify that state was NOT mutated
        });

        it("should not register a player who has ticket with repeating numbers (every number should be unique)", () => {
            const action = { type: "registered", payload: { name: "cheater", ticket: invalidTicket } } as const;
            const state = bingoReducer(initialState, action);

            expect(state.players).not.toContainEqual(expect.objectContaining({ name: "cheater" }));
            expect(state).toBe(initialState); // verify that state reference did not change
        });
    });

    describe("drawing numbers", () => {
        it("should add the drawn number to state", () => {
            const action = { type: "numberDrawn", payload: 10 } as const;
            const state = bingoReducer(initialState, action);
            expect(state.numbersDrawn).toContainEqual(10);
            expect(state.numbersDrawn).toHaveLength(1);
            expect(state).not.toBe(initialState); // verify that state was NOT mutated
        });

        it("should not add number to state if it was already drawn before", () => {
            const action = { type: "numberDrawn", payload: 10 } as const;
            const stateWithNumberDrawn = { ...initialState, numbersDrawn: [10] };
            const state = bingoReducer(stateWithNumberDrawn, action);
            expect(state.numbersDrawn).toContainEqual(10);
            expect(state.numbersDrawn).toHaveLength(1);
            expect(state).toBe(stateWithNumberDrawn); // verify that state reference did not change
        });

        it("should add multiple numbers to state, excluding the numbers which were already drawn", () => {
            const actions = [
                { type: "numberDrawn", payload: 1 },
                { type: "numberDrawn", payload: 2 },
                { type: "numberDrawn", payload: 3 },
                { type: "numberDrawn", payload: 4 },
                { type: "numberDrawn", payload: 50 },
                { type: "numberDrawn", payload: 1 },
            ] as const;
            const state = actions.reduce(bingoReducer, initialState);
            expect(state.numbersDrawn).toContainEqual(1);
            expect(state.numbersDrawn).toContainEqual(2);
            expect(state.numbersDrawn).toContainEqual(3);
            expect(state.numbersDrawn).toContainEqual(4);
            expect(state.numbersDrawn).toContainEqual(50);
            expect(state.numbersDrawn).toHaveLength(5);
            expect(state).not.toBe(initialState); // verify that state was NOT mutated
        });
    });

    describe("winning", () => {
        it("when there are no winners, should not change the winners in state", () => {
            const actions = ([
                { type: "registered", payload: { name: "karlis", ticket: ticket1 } },
                { type: "registered", payload: { name: "anna", ticket: ticket2 } },
                { type: "registered", payload: { name: "dan", ticket: ticket3 } },
                { type: "numberDrawn", payload: 1 },
                { type: "numberDrawn", payload: 2 },
                { type: "numberDrawn", payload: 3 },
            ] as const);
            const state = actions.reduce(bingoReducer, initialState);
            expect(state.winners).toBe(initialState.winners);
        });

        it("when player's ticket makes a full horizontal line, should add player's name to winners", () => {
            const actions = ([
                { type: "registered", payload: { name: "karlis", ticket: ticket1 } },
                { type: "registered", payload: { name: "anna", ticket: ticket2 } },
                { type: "registered", payload: { name: "dan", ticket: ticket3 } },
                { type: "numberDrawn", payload: 14 },
                { type: "numberDrawn", payload: 24 },
                { type: "numberDrawn", payload: 31 },
                { type: "numberDrawn", payload: 52 },
                { type: "numberDrawn", payload: 66 },
            ] as const);
            const state = actions.reduce(bingoReducer, initialState);
            expect(state.winners).toHaveLength(1);
            expect(state.winners).toContainEqual("anna");
        });

        it("when player's ticket makes a full horizontal center line, should add player's name to winners", () => {
            const actions = ([
                { type: "registered", payload: { name: "karlis", ticket: ticket1 } },
                { type: "registered", payload: { name: "anna", ticket: ticket2 } },
                { type: "registered", payload: { name: "dan", ticket: ticket3 } },
                { type: "numberDrawn", payload: 8 },
                { type: "numberDrawn", payload: 20 },
                { type: "numberDrawn", payload: 47 },
                { type: "numberDrawn", payload: 70 },
            ] as const);
            const state = actions.reduce(bingoReducer, initialState);
            expect(state.winners).toHaveLength(1);
            expect(state.winners).toContainEqual("karlis");
        });

        it("when player's ticket makes a full vertical line, should add player's name to winners", () => {
            const actions = ([
                { type: "registered", payload: { name: "karlis", ticket: ticket1 } },
                { type: "registered", payload: { name: "anna", ticket: ticket2 } },
                { type: "registered", payload: { name: "dan", ticket: ticket3 } },
                { type: "numberDrawn", payload: 54 },
                { type: "numberDrawn", payload: 56 },
                { type: "numberDrawn", payload: 50 },
                { type: "numberDrawn", payload: 48 },
                { type: "numberDrawn", payload: 46 },
            ] as const);
            const state = actions.reduce(bingoReducer, initialState);
            expect(state.winners).toHaveLength(1);
            expect(state.winners).toContainEqual("dan");
        });

        it("when player's ticket makes a full vertical center line, should add player's name to winners", () => {
            const actions = ([
                { type: "registered", payload: { name: "karlis", ticket: ticket1 } },
                { type: "registered", payload: { name: "anna", ticket: ticket2 } },
                { type: "registered", payload: { name: "dan", ticket: ticket3 } },
                { type: "numberDrawn", payload: 32 },
                { type: "numberDrawn", payload: 31 },
                { type: "numberDrawn", payload: 35 },
                { type: "numberDrawn", payload: 34 },
            ] as const);
            const state = actions.reduce(bingoReducer, initialState);
            expect(state.winners).toHaveLength(1);
            expect(state.winners).toContainEqual("anna");
        });

        it("when player's ticket makes a full diagonal line, should add player's name to winners", () => {
            const actions = ([
                { type: "registered", payload: { name: "karlis", ticket: ticket1 } },
                { type: "registered", payload: { name: "anna", ticket: ticket2 } },
                { type: "registered", payload: { name: "dan", ticket: ticket3 } },
                { type: "numberDrawn", payload: 10 },
                { type: "numberDrawn", payload: 65 },
                { type: "numberDrawn", payload: 52 },
                { type: "numberDrawn", payload: 30 },
            ] as const);
            const state = actions.reduce(bingoReducer, initialState);
            expect(state.winners).toHaveLength(1);
            expect(state.winners).toContainEqual("karlis");
        });

        it("when player's ticket makes a full diagonal opposite line, should add player's name to winners", () => {
            const actions = ([
                { type: "registered", payload: { name: "karlis", ticket: ticket1 } },
                { type: "registered", payload: { name: "anna", ticket: ticket2 } },
                { type: "registered", payload: { name: "dan", ticket: ticket3 } },
                { type: "numberDrawn", payload: 56 },
                { type: "numberDrawn", payload: 10 },
                { type: "numberDrawn", payload: 27 },
                { type: "numberDrawn", payload: 67 },
            ] as const);
            const state = actions.reduce(bingoReducer, initialState);
            expect(state.winners).toHaveLength(1);
            expect(state.winners).toContainEqual("dan");
        });
    });
});
