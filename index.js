const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => [...board];
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
    const getScore = () => score;
    const addScore = () => score++;
    return { name, marker, getScore, addScore };
}

function createGame(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const playerOne = createPlayer(playerOneName, 'X');
    const playerTwo = createPlayer(playerTwoName, 'O');

    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    let activePlayer = playerOne;
    let isGameOver = false;

    const getBoard = () => gameBoard.getBoard();
    const getPlayers = () => [playerOne, playerTwo];
    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const hasWinner = () => {
        const board = gameBoard.getBoard();
        return WINNING_COMBINATIONS.some(([a, b, c]) =>
            board[a] !== '' && board[a] === board[b] && board[a] === board[c]
        );
    };

    const isDraw = () => gameBoard.getBoard().every(cell => cell !== '');

    const resetGame = () => {
        gameBoard.resetBoard();
        activePlayer = playerOne;
        isGameOver = false;
    };

    const playRound = index => {
        if (isGameOver) return false;

        const validMove = gameBoard.placeMarker(index, activePlayer.marker);
        if (!validMove) return false;

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

    return { getBoard, getPlayers, getActivePlayer, resetGame, playRound };
}

const displayController = (() => {
    let game = null;

    // DOM references
    const startForm = document.querySelector('.start-game');
    const playerOneNameInput = document.querySelector('#player-one');
    const playerTwoNameInput = document.querySelector('#player-two');

    const boardContainer = document.querySelector('.board-container');
    const activePlayerDisplay = document.querySelector('.active-player');

    const playerOneNameDisplay = document.querySelector('.player-one-name');
    const playerOneScoreDisplay = document.querySelector('.player-one-score');
    const playerTwoNameDisplay = document.querySelector('.player-two-name');
    const playerTwoScoreDisplay = document.querySelector('.player-two-score');

    const buttonContainer = document.querySelector('.btn-container');
    const playAgainBtn = document.querySelector('.play-btn');
    const resetBtn = document.querySelector('.reset-btn');

    // Helpers
    const updateActivePlayer = () => {
        activePlayerDisplay.textContent = `${game.getActivePlayer().name}'s Turn`;
        activePlayerDisplay.style.display = 'block';
    };

    const updateScores = () => {
        const [playerOne, playerTwo] = game.getPlayers();
        playerOneScoreDisplay.textContent = playerOne.getScore();
        playerTwoScoreDisplay.textContent = playerTwo.getScore();
    };

    const renderBoard = () => {
        boardContainer.textContent = '';

        game.getBoard().forEach((cell, index) => {
            const cellBtn = document.createElement('button');
            cellBtn.classList.add('cell');
            cellBtn.textContent = cell;
            boardContainer.appendChild(cellBtn);

            cellBtn.addEventListener('click', () => {
                const result = game.playRound(index);
                if (result === false) return;

                renderBoard();

                if (typeof result === 'string') {
                    activePlayerDisplay.textContent = result;
                    updateScores();
                    buttonContainer.style.display = 'flex';
                } else {
                    updateActivePlayer();
                }
            });
        });
    };

    // Event listeners
    startForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const playerOneName = playerOneNameInput.value.trim() || 'Player One';
        const playerTwoName = playerTwoNameInput.value.trim() || 'Player Two';

        game = createGame(playerOneName, playerTwoName);
        game.resetGame();

        playerOneNameDisplay.textContent = playerOneName;
        playerTwoNameDisplay.textContent = playerTwoName;

        updateActivePlayer();
        updateScores();
        renderBoard();

        startForm.style.display = 'none';
        buttonContainer.style.display = 'none';
    });

    playAgainBtn.addEventListener('click', () => {
        game.resetGame();
        updateActivePlayer();
        renderBoard();
        buttonContainer.style.display = 'none';
    });

    resetBtn.addEventListener('click', () => {
        game = null;
        boardContainer.textContent = '';
        activePlayerDisplay.style.display = 'none';
        buttonContainer.style.display = 'none';
        startForm.style.display = 'flex';
        playerOneScoreDisplay.textContent = '0';
        playerTwoScoreDisplay.textContent = '0';
    });
})();