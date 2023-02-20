import * as React from "react";
import { DrawnNumbers } from "./DrawnNumbers.js";
import { RegisteredTickets } from "./RegisteredTickets.js";
import { UnregisteredTickets } from "./UnregisteredTickets.js";
import { Winners } from "./Winners.js";
import { createRoot } from "react-dom/client";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {bingoReducer} from "./bingoReducer";

function App() {
    const store = createStore(bingoReducer)

    return (
        <Provider store={store}>
            <h1>🍡 Bingo</h1>
            <DrawnNumbers />
            <Winners />
            <RegisteredTickets />
            <UnregisteredTickets />
        </Provider>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />)
