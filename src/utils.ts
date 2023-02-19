import {
    BingoTicket,
    NumberIn1stCol,
    NumberIn2ndCol,
    NumberIn3rdCol,
    NumberIn4thCol,
    NumberIn5thCol,
} from "./types";

// prettier-ignore
const names = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Shirley', 'Eric', 'Angela', 'Jonathan', 'Helen', 'Stephen', 'Anna', 'Larry', 'Brenda', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Emma', 'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Gregory', 'Christine', 'Frank', 'Debra', 'Alexander', 'Rachel', 'Raymond', 'Catherine', 'Patrick', 'Carolyn', 'Jack', 'Janet', 'Dennis', 'Ruth', 'Jerry', 'Maria', 'Tyler', 'Heather', 'Aaron', 'Diane', 'Jose', 'Virginia', 'Adam', 'Julie', 'Henry', 'Joyce', 'Nathan', 'Victoria', 'Douglas', 'Olivia', 'Zachary', 'Kelly', 'Peter', 'Christina', 'Kyle', 'Lauren', 'Walter', 'Joan', 'Ethan', 'Evelyn', 'Jeremy', 'Judith', 'Harold', 'Megan', 'Keith', 'Cheryl', 'Christian', 'Andrea', 'Roger', 'Hannah', 'Noah', 'Martha', 'Gerald', 'Jacqueline', 'Carl', 'Frances', 'Terry', 'Gloria', 'Sean', 'Ann', 'Austin', 'Teresa', 'Arthur', 'Kathryn', 'Lawrence', 'Sara', 'Jesse', 'Janice', 'Dylan', 'Jean', 'Bryan', 'Alice', 'Joe', 'Madison', 'Jordan', 'Doris', 'Billy', 'Abigail', 'Bruce', 'Julia', 'Albert', 'Judy', 'Willie', 'Grace', 'Gabriel', 'Denise', 'Logan', 'Amber', 'Alan', 'Marilyn', 'Juan', 'Beverly', 'Wayne', 'Danielle', 'Roy', 'Theresa', 'Ralph', 'Sophia', 'Randy', 'Marie', 'Eugene', 'Diana', 'Vincent', 'Brittany', 'Russell', 'Natalie', 'Elijah', 'Isabella', 'Louis', 'Charlotte', 'Bobby', 'Rose', 'Philip', 'Alexis', 'Johnny', 'Kayla'];

export function randomName() {
    return names[random(0, names.length)];
}

export function generateRandomTicket(): BingoTicket {
    const col1 = () => random(1, 15) as NumberIn1stCol;
    const col2 = () => random(16, 30) as NumberIn2ndCol;
    const col3 = () => random(31, 45) as NumberIn3rdCol;
    const col4 = () => random(46, 60) as NumberIn4thCol;
    const col5 = () => random(61, 75) as NumberIn5thCol;
    let ticket: BingoTicket;
    do {
        ticket = [
            [col1(), col2(), col3(), col4(), col5()],
            [col1(), col2(), col3(), col4(), col5()],
            [col1(), col2(), /* x */ col4(), col5()],
            [col1(), col2(), col3(), col4(), col5()],
            [col1(), col2(), col3(), col4(), col5()],
        ];
    } while (!isValid(ticket));
    return ticket;
}

function isValid(ticket: BingoTicket) {
    const ticketNumbers = ticket.reduce(
        (flat, row) => flat.concat(row),
        [] as number[]
    );
    const uniqueTicketNumbers = ticketNumbers.filter(
        (num, i, all) => all.indexOf(num) === i
    );
    return ticketNumbers.length === uniqueTicketNumbers.length;
}

function random(from: number, to: number) {
    return from + Math.floor(Math.random() * (to - from));
}
