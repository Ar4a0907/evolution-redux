import * as React from "react";
import { Ticket } from "./Ticket.js";
import { generateRandomTicket } from "./utils.js";

export function RegisteredTickets() {
    const players = [{ name: "Example", ticket: generateRandomTicket() }];
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
