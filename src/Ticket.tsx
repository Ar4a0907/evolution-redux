import * as React from "react";
import {BingoState, BingoTicket} from "./types";
import {useSelector} from "react-redux";

export function Ticket({ numbers, name }: Props) {
  const drawnNumbers = useSelector((state:BingoState)=> state.numbersDrawn)

    return (
        <div data-role="ticket">
            <h4>{name}</h4>
            <div className="ticketNumbers">
                {numbers.map((col, i) => {
                    return col.map((num, j) => {
                        return (
                            <React.Fragment key={`${i} + ${j}`}>
                                <div className={`num ${drawnNumbers.includes(num) ? "marked" : ""}`}>{num}</div>
                                {i === 2 && j === 1 ? <div>*</div> : null}
                            </React.Fragment>
                        );
                    });
                })}
            </div>
        </div>
    );
}

interface Props {
    numbers: BingoTicket;
    name: string;
}
