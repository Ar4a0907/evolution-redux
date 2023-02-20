import * as React from "react";
import { Ticket } from "./Ticket.js";
import {useSelector} from "react-redux";
import {BingoState} from "./types";

export function RegisteredTickets() {
    const players = useSelector((state:BingoState) => state.players);
    return (
        <section data-role="registered-tickets">
            <h3>Registered tickets</h3>
            <ul>
                {players.map((player) => (
                    <li key={player.name}>
                        <Ticket name={player.name} numbers={player.ticket} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
