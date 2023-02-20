import {BingoAction, BingoState, BingoTempTicket, BingoTicket} from "./types";

const initialState: BingoState = {
    players: [],
    numbersDrawn: [],
    winners: [],
};

function checkWinner(players: readonly{ name: string; ticket: BingoTicket; }[], numbersDrawn: readonly number[], stateWinners: readonly string[]): string[] {
    const winners: string[] = []
    if(numbersDrawn.length >= 4) {
        const checkIfWinner = (ticket: BingoTempTicket, numbers:readonly number[]) => {
            const mainDiagonal: number[] = []
            const secondaryDiagonal: number[] = []
            for(let i = 0; i < ticket.length; i++) {
                const column: number[] = []
                const row: number[] = []
                for(let j = 0; j < ticket[i].length; j++) {
                    if(i === 2 && j===2)
                        continue
                    column.push(ticket[j][i])
                    row.push(ticket[i][j])

                    if(j === i)
                        mainDiagonal.push(ticket[i][j])
                    if (i + j === ticket.length - 1)
                        secondaryDiagonal.push(ticket[i][j])
                }
                if(row.every(number => numbers.includes(number)))
                    return true
                if(column.every(number => numbers.includes(number)))
                    return true
            }
            if(mainDiagonal.every(number => numbers.includes(number)))
                return true
            if(secondaryDiagonal.every(number => numbers.includes(number)))
                return true

            return false
        }

        players.map(player => {
            let isWinner = false
            const tempTicket = createTempTicket(player.ticket)

            if(checkIfWinner(tempTicket, numbersDrawn)) {
                isWinner = true;
            }

            if(isWinner && !stateWinners.includes(player.name))
                winners.push(player.name)
        })
    }
    return winners
}

function isTicketValid(ticket: BingoTicket): boolean {
    const tempTicket = createTempTicket(ticket)
    for (let col = 0; col < tempTicket[0].length; col++) {
        const columnNumbers: number[] = [];
        for (let row = 0; row < tempTicket.length; row++) {
            if(col === 2 && row === 2)
                ++col
            const number = tempTicket[row][col];
            if (columnNumbers.includes(number)) {
                return false;
            }
            columnNumbers.push(number);
        }
        if (columnNumbers.length !== tempTicket.length) {
            return false;
        }
    }
    return true;
}

function createTempTicket(ticket: BingoTicket): BingoTempTicket {
    return [
        [...ticket[0]],
        [...ticket[1]],
        [ticket[2][0], ticket[2][1], -1, ticket[2][2], ticket[2][3]],
        [...ticket[3]],
        [...ticket[4]]
    ]
}

export function bingoReducer(state = initialState, action: BingoAction): BingoState {

    switch (action.type) {
        case 'registered':
            const player = {
                ...action.payload,
            }

            if(isTicketValid(player.ticket))
                return {...state, players: state.players.concat(player)}

            return state

        case 'numberDrawn':
            const drawnNumber = action.payload

            if(!state.numbersDrawn.includes(drawnNumber)) {
                const winners = checkWinner(state.players, [...state.numbersDrawn, drawnNumber], state.winners)

                if(winners.length !== 0)
                    return {...state, numbersDrawn: state.numbersDrawn.concat(drawnNumber), winners: state.winners.concat(winners)}
                else
                    return {...state, numbersDrawn: state.numbersDrawn.concat(drawnNumber)}
            }

            return state
    }

    return state;
}
