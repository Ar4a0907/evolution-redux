import * as React from "react";
import {useSelector} from "react-redux";
import {BingoState} from "./types";

export function Winners() {
    const winners = useSelector((state: BingoState) => state.winners)
    return (
        <section data-role="winners">
            <h3>Winners</h3>
            <p>
                {winners.length
                    ? winners.join()
                    : "no winners yet, game in progress"}
            </p>
        </section>
    );
}
