import * as React from "react";

export function Winners() {
    const winners: string[] = [];
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
