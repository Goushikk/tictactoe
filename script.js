const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageContainer = document.getElementById('message-container');
const resetButton = document.getElementById('reset-button');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (board[index] !== '' || !isGameActive) {
        messageContainer.textContent = "Cell is already taken!";
        messageContainer.className = "错了";
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    messageContainer.textContent = "";
    messageContainer.className = "";

    const winner = checkWinner();
    if (winner) {
        messageContainer.textContent = `Player ${winner} wins!`;
        messageContainer.className = "赢了";
        isGameActive = false;
        cells.forEach(c => c.classList.add('disabled'));
    } else if (isBoardFull()) {
        messageContainer.textContent = "It's a tie!";
        messageContainer.className = "平局";
        isGameActive = false;
    } else {
        switchPlayer();
    }
}

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            return board[a];
        }
    }
    return null;
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning-cell', 'disabled');
        cell.onclick = handleCellClick;
    });
    messageContainer.textContent = '';
    messageContainer.className = '';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
