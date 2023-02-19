import * as React from "react";
import { BingoTicket } from "./types";

export function Ticket({ numbers, name }: Props) {
    return (
        <div data-role="ticket">
            <h4>{name}</h4>
            <div className="ticketNumbers">
                {numbers.map((col, i) => {
                    return col.map((num, j) => {
                        const isDrawn = Math.random() < 0.2;
                        return (
                            <React.Fragment key={`${i} + ${j}`}>
                                <div className={`num ${isDrawn ? "marked" : ""}`}>{num}</div>
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
