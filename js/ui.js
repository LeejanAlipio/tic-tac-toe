import { createGame } from "./game-logic.js";

const displayController = (() => {
    let game = null;

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
        boardContainer.replaceChildren();

        game.getBoard().forEach((cell, index) => {
            const cellBtn = document.createElement('button');
            cellBtn.classList.add('cell');
            if (cell === 'X') cellBtn.classList.add('marker-x');
            if (cell === 'O') cellBtn.classList.add('marker-o');
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

        playerOneNameDisplay.textContent = playerOneName;
        playerTwoNameDisplay.textContent = playerTwoName;

        updateActivePlayer();
        updateScores();
        renderBoard();

        startForm.style.display = 'none';
        buttonContainer.style.display = 'none';
    });

    playAgainBtn.addEventListener('click', () => {
        if (!game) return;
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
        playerOneNameDisplay.textContent = '';
        playerTwoNameDisplay.textContent = '';
    });
})();