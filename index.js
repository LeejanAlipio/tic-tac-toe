const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    const resetBoard = () => board.fill('');
    const placeMarker = (index, marker) => {
        if (index < 0 || index > 8 || board[index] !== '') return false;
        board[index] = marker;
        return true;
    };

    return { getBoard, resetBoard, placeMarker };
})();

function createPlayer(name, marker) {
    let score = 0;
    const addScore = () => score++;
    const getScore = () => score;
    return { name, marker, getScore, addScore };
}

function playGame(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const playerOne = createPlayer(playerOneName, 'X');
    const playerTwo = createPlayer(playerTwoName, 'O');

    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    let activePlayer = playerOne;
    let isGameOver = false;

    const getLiveBoard = () => gameBoard.getBoard();

    const resetLiveBoard = () => {
        gameBoard.resetBoard();
        activePlayer = playerOne;
        isGameOver = false;
    };

    const switchPlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const getActivePlayer = () => activePlayer;

    const hasWinner = () => {
        const board = gameBoard.getBoard();
        return WINNING_COMBINATIONS.some(([a, b, c]) =>
            board[a] !== '' && board[a] === board[b] && board[a] === board[c]
        );
    };

    const isDraw = () => gameBoard.getBoard().every(cell => cell !== '');

    const playRound = (index) => {
        if (isGameOver) return false;

        const playerMove = gameBoard.placeMarker(index, activePlayer.marker);
        if (!playerMove) return false;

        if (hasWinner()) {
            activePlayer.addScore();
            isGameOver = true;
            return `${activePlayer.name} won!`;
        }

        if (isDraw()) {
            isGameOver = true;
            return 'Draw';
        }

        switchPlayer();
        return true;
    };

    return { getLiveBoard, resetLiveBoard, playRound, getActivePlayer, getPlayers: () => [playerOne, playerTwo]};
}

const displayGame = (() => {
    let game = null;

    const boardContainer = document.querySelector('.board-container');
    const activePlayerDisplay = document.querySelector('.active-player');
    const playerOneName = document.querySelector('.player-one-name');
    const playerTwoName = document.querySelector('.player-two-name');
    const playerOneScore = document.querySelector('.player-one-score');
    const playerTwoScore = document.querySelector('.player-two-score');
    const resetBtn = document.querySelector('.reset-btn');
    const startForm = document.querySelector('.start-game');

    const updateActivePlayer = () => {
        const active = game.getActivePlayer();
        activePlayerDisplay.textContent = `${active.name}'s Turn`;
        activePlayerDisplay.style.display = 'block';
    };

    const updateScores = () => {
        playerOneScore.textContent = game.getPlayers()[0].getScore();
        playerTwoScore.textContent = game.getPlayers()[1].getScore();
    };

    const renderBoard = () => {
        boardContainer.innerHTML = '';
        const board = game.getLiveBoard();

        board.forEach((cell, index) => {
            const cellBtn = document.createElement('button');
            cellBtn.classList.add('cell');
            cellBtn.textContent = cell;
            boardContainer.append(cellBtn);

            cellBtn.addEventListener('click', () => {
                const result = game.playRound(index);
                if (result === false) return;

                renderBoard();

                if (typeof result === 'string') {
                    activePlayerDisplay.textContent = result;
                    updateScores();
                } else {
                    updateActivePlayer();
                }
            });
        });
    };

    startForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const p1 = document.querySelector('#player-one').value.trim() || 'Player One';
        const p2 = document.querySelector('#player-two').value.trim() || 'Player Two';

        game = playGame(p1, p2);

        playerOneName.textContent = p1;
        playerTwoName.textContent = p2;

        updateScores();
        updateActivePlayer();
        renderBoard();

        startForm.style.display = 'none';
    });

    resetBtn.addEventListener('click', () => {
        if (!game) return;
        game.resetLiveBoard();
        updateActivePlayer();
        updateScores(); // add this
        renderBoard();
        startForm.style.display = 'flex';
    });
})();