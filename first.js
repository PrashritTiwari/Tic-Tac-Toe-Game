const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const switchModeButton = document.getElementById('switch-mode');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;
let vsAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetButton.addEventListener('click', resetGame);
    switchModeButton.addEventListener('click', switchMode);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (board[cellIndex] !== '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;

    if (vsAI && currentPlayer === 'O') {
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    updateCell(cells[randomIndex], randomIndex);
    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!board.includes('')) {
        statusText.textContent = 'Draw!';
        running = false;
    } else {
        switchPlayer();
    }
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function switchMode() {
    vsAI = !vsAI;
    switchModeButton.textContent = vsAI ? 'Play vs Human' : 'Play vs AI';
    resetGame();
}