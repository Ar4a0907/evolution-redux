import * as React from "react";
import { Ticket } from "./Ticket.js";
import {generateRandomTicket, random, randomName} from "./utils.js";
import {useCallback} from "react";
import {useDispatch} from "react-redux";

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
    const dispatch = useDispatch()
    const buttonCallback = useCallback(() => {
        dispatch({
            type: 'registered',
            payload: {
              name: name,
              ticket: numbers
            },
          }
        )
    },[])

    return (
        <>
            <Ticket name={name} numbers={numbers} />
            <button onClick={buttonCallback}>Register ticket</button>
        </>
    );
}
