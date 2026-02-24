const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]];
let currentTern = CROSS;
let ifWins = false;

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function changeTern(currentTern) {
    if (currentTern === CROSS) {
        return ZERO;
    } else {
        return CROSS;
    }
}

function checkWinner() {
    const size = board.length;

    for (let i = 0; i < size; i++) {
        if (board[i][0] && board[i].every(cell => cell === board[i][0])) {
            return {winner: board[i][0], cells: [[i, 0], [i, 1], [i, 2]]};
        }
        if (board[0][i] && [board[0][i], board[1][i], board[2][i]].every(cell => cell === board[0][i])) {
            return {winner: board[0][i], cells: [[0, i], [1, i], [2, i]]};
        }
    }

    if (board[0][0] && [board[0][0], board[1][1], board[2][2]].every(cell => cell === board[0][0])) {
        return {winner: board[0][0], cells: [[0, 0], [1, 1], [2, 2]]};
    }

    if (board[0][2] && [board[0][2], board[1][1], board[2][0]].every(cell => cell === board[0][2])) {
        return {winner: board[0][2], cells: [[0, 2], [1, 1], [2, 0]]};
    }

    return null;
}

function cellClickHandler(row, col) {
    if (board[row][col] !== null || ifWins) {
        return;
    }

    board[row][col] = currentTern;
    renderSymbolInCell(currentTern, row, col);

    const winData = checkWinner();

    if (winData) {
        for (const [r, c] of winData.cells) {
            renderSymbolInCell(winData.winner, r, c, 'red');
        }
        setTimeout(() => alert(winData.winner), 50);
        ifWins = true;
        return;
    }

    const hasEmptyCells = board.some(row => row.some(cell => cell === null));
    if (!hasEmptyCells) {
        alert("Победила дружба");
        ifWins = true;
        return;
    }

    currentTern = changeTern(currentTern);
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]];

    ifWins = false;
    currentTern = CROSS;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            renderSymbolInCell(null, row, col);
        }
    }
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
