import { BingoAction, BingoState } from "./types";

const initialState: BingoState = {
    players: [],
    numbersDrawn: [],
    winners: [],
};

export function bingoReducer(state = initialState, action: BingoAction): BingoState {

    // your code here

    return state;
}
