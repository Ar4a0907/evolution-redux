/// <reference types="cypress" />

describe("bingo test", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:3000");
    cy.get('[data-role="unregistered-tickets"] [data-role="ticket"]').as(
      "unregisteredTickets"
    );
  });

  it("ticket can be registered", () => {
    cy.get("@unregisteredTickets")
      .should("have.length", 10)
      .eq(2)
      .as("ticket1")
      .parent()
      .find("button")
      .filter((i, button) => button.innerText.includes("Register"))
      .click();

    cy.get("@ticket1").then(($el) => {
      cy.get('[data-role="registered-tickets"] [data-role="ticket"]')
        .should("have.length", 1)
        .eq(0)
        .should("have.text", $el.text());
    });
  });

  it("multiple tickets can be registered", () => {
    cy.get("@unregisteredTickets")
      .filter((i) => [2, 5, 8].includes(i))
      .as("tickets")
      .parent()
      .find("button")
      .filter((i, button) => button.innerText.includes("Register"))
      .click({ multiple: true });

    cy.get("@tickets").then(($el) => {
      cy.get('[data-role="registered-tickets"] [data-role="ticket"]')
        .should("have.length", 3)
        .should("have.text", $el.text());
    });
  });

  it("numbers can be drawn", () => {
    cy.get('[data-role="drawn-numbers"] .drawnNumber').should("have.length", 0);
    cy.get('[data-role="drawn-numbers"] button').click();
    cy.get('[data-role="drawn-numbers"] .drawnNumber').should("have.length", 1);
    cy.get('[data-role="drawn-numbers"] button').click();
    cy.get('[data-role="drawn-numbers"] .drawnNumber').should("have.length", 2);
  });

  it("drawn numbers should be marked on registered tickets", () => {
    cy.get("@unregisteredTickets")
      .filter((i) => [2, 5, 8].includes(i))
      .as("tickets")
      .parent()
      .find("button")
      .filter((i, button) => button.innerText.includes("Register"))
      .click({ multiple: true });

    cy.get('[data-role="drawn-numbers"] button')
      .click()
      .click()
      .click()
      .click()
      .click();

    cy.get('[data-role="unregistered-tickets"] [data-role="ticket"] .marked')
      .should("have.length.above", 0)
      .each(($el) => {
        cy.get('[data-role="drawn-numbers"] .drawnNumber')
          .filter((i, num) => num.innerText === $el.text())
          .should("have.length", 1);
      });
  });

  it("should mark the winner", () => {
    cy.get("@unregisteredTickets")
      .filter((i) => [2, 5, 8].includes(i))
      .as("tickets")
      .parent()
      .find("button")
      .filter((i, button) => button.innerText.includes("Register"))
      .click({ multiple: true });

    let iteration = 0;
    const iterationLimit = 65;
    const drawNumber = () => {
      iteration ++;
      if (iteration > iterationLimit) {
        throw new Error(`Test failed, winner not found after clicking "Draw number" ${iterationLimit} times.`);
      }
      cy.get('[data-role="drawn-numbers"] button').click();
      cy.get('[data-role="drawn-numbers"] .drawnNumber').then(($nums) => {
        const drawnNumbers = $nums
          .get()
          .map((el) => Number(el.innerText.trim()));
        cy.get('[data-role="registered-tickets"] [data-role="ticket"]').then(
          ($el) => {
            const winningTicket = $el.get().find((el) => {
              const nums = el.querySelectorAll<HTMLDivElement>(".num");
              const ticket = Array.from(nums).reduce(
                (rows, el, i) => {
                  const num = Number(el.innerText.trim());
                  const insertionIndex = i > 13 ? i + 1 : i;
                  rows[Math.floor(insertionIndex / 5)][
                    insertionIndex % 5
                  ] = num;
                  return rows;
                },
                [[], [], [], [], []] as number[][]
              );
              return isWinning(drawnNumbers, ticket);
            });

            if (winningTicket) {
              const name = winningTicket.querySelector("h4").innerText.trim();
              cy.get('[data-role="winners"]').should("contain.text", name);
            } else {
              drawNumber();
            }
          }
        );
      });
    };

    drawNumber();
  });
});

function isWinning(drawnNumbers: number[], ticket: number[][]) {
  const has = (...params: Array<[number, number]>) =>
    params.every(([r, c]) => drawnNumbers.includes(ticket[r][c]));
  // prettier-ignore
  return (has([0, 0], [1, 1], [3, 3], [4, 4]) || has([0, 4], [1, 3], [3, 1], [4, 0])) // diagonal
      || (has([0, 0], [0, 1], [0, 2], [0, 3], [0, 4]) || has([1, 0], [1, 1], [1, 2], [1, 3], [1, 4]) || has([2, 0], [2, 1], [2, 2], [2, 3]) || has([3, 0], [3, 1], [3, 2], [3, 3], [3, 4]) || has([4, 0], [4, 1], [4, 2], [4, 3], [4, 4])) // horizontal
      || (has([0, 0], [1, 0], [2, 0], [3, 0], [4, 0]) || has([0, 1], [1, 1], [2, 1], [3, 1], [4, 1]) || has([0, 2], [1, 2], [3, 2], [4, 2]) || has([0, 3], [1, 3], [2, 2], [3, 3], [4, 3]) || has([0, 4], [1, 4], [2, 3], [3, 4], [4, 4])); // vertical
}
