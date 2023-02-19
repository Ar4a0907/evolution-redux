import * as React from "react";
import { Ticket } from "./Ticket.js";
import { generateRandomTicket, randomName } from "./utils.js";

export function UnregisteredTickets() {
    return (
        <section data-role="unregistered-tickets">
            <h3>Unregistered tickets</h3>
            <ul>
                {[...Array(10)].map((_, i) => (
                    <li key={i}>
                        <RegisterableTicket />
                    </li>
                ))}
            </ul>
        </section>
    );
}

function RegisterableTicket() {
    const numbers = generateRandomTicket();
    const name = randomName();
    return (
        <>
            <Ticket name={name} numbers={numbers} />
            <button>Register ticket</button>
        </>
    );
}
