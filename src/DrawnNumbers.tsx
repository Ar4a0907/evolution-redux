import * as React from "react";

export function DrawnNumbers() {
    const drawnNumbers: number[] = [11, 8, 54, 30];
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
            <button>Draw number</button>
        </section>
    );
}
