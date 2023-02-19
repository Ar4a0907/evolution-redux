# Redux homework

Add logic to a [Bingo](https://en.wikipedia.org/wiki/Bingo_(American_version)) game.

## Game rules
* Players should be saved in state by dispatching `registered` action
* Possible numbers are 1-75, where the first column can contain numbers 1-15, second 16-30, third 31-45, fourth 46-60, fifth 61-75
* During a bingo game, random numbers are drawn one by one, they should be saved in state by dispatching the `numberDrawn` action
* Player can win if they get a horiozntal line, a vertical line or a diagonal line
* When player wins, their name should be saved in state in the winners array

## Task 1
1. Clone this repo
1. Install dependencies: `npm i` || `yarn`
1. Run unit tests in watch mode: `npm run test:watch` || `yarn test:watch`
1. Make changes to [reducer](./bingoReducer.ts) until all unit tests are green

## Task 2
1. Run `npm start` || `yarn start`
1. Open the game UI on http://localhost:3000
1. Add logic to the UI so that it works. Use a redux store. Use the reducer that you created in Task 1.
1. Run integration tests: `cypress open` and then click on "bingo.spec.ts"
1. Make changes until all integration tests are green

### Example video of passing tests
https://user-images.githubusercontent.com/2631515/156952022-98dd9797-2e30-46e4-abbf-79e86c94ebec.mp4
## Submitting your solution

Please push your changes to the `main branch` of this repository. You can push one or more commits. <br>

Once you are finished with the task, please click the `Submit Solution` link on <a href="https://app.codescreen.com/candidate/a0c3fac4-bdc7-42a6-8410-17771ed8e9b5" target="_blank">this screen</a>.