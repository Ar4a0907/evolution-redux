import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {BingoState} from "./types";
import {useCallback} from "react";
import {random} from "./utils";

export function DrawnNumbers() {
    const drawnNumbers = useSelector((state:BingoState)=> state.numbersDrawn)
    const dispatch = useDispatch()

    const buttonCallback = useCallback(() => {
      dispatch({
        type: 'numberDrawn',
        payload: random(1, 75)
      })
    },[])

    return (
        <section data-role="drawn-numbers">
            <h3>Drawn numbers</h3>
            <ul className="drawn">
                {drawnNumbers.map((n) => (
                    <li key={n} className="drawnNumber">
                        {n}
                    </li>
                ))}
            </ul>
            <button onClick={buttonCallback}>Draw number</button>
        </section>
    );
}
