import * as React from "react";
import { DrawnNumbers } from "./DrawnNumbers.js";
import { RegisteredTickets } from "./RegisteredTickets.js";
import { UnregisteredTickets } from "./UnregisteredTickets.js";
import { Winners } from "./Winners.js";
import { createRoot } from "react-dom/client";

function App() {
    return (
        <>
            <h1>🍡 Bingo</h1>
            <DrawnNumbers />
            <Winners />
            <RegisteredTickets />
            <UnregisteredTickets />
        </>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />)
