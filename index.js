function gameBoard() {
    let board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ]

    const getBoard = () => board;
    const resetBoard = () => board.fill('');
    const placeMarker = (index, marker) => {
        if (index < 0 || index > 8 || board[index] !== '') return false;
        board[index] = marker;
        return true;
    }

    return { getBoard, resetBoard, placeMarker }
}

function createPlayer(name, marker) {
    let score = 0;

    const addScore = () => score++;
    const getScore = () => score;
    return { name, marker, getScore, addScore } 
}

function playGame(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const board = gameBoard();
    
    const playerOne = createPlayer(playerOneName, 'X');
    const playerTwo = createPlayer(playerTwoName, 'O');

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    
    let activePlayer = playerOne;

    let gameOver = false;

    const getBoard = () => board.getBoard();

    const resetBoard = () => {
        board.resetBoard();
        activePlayer = playerOne;
        gameOver = false;
    }

    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    const getActivePlayer = () => activePlayer;

    const getPlayers = () => [playerOne, playerTwo];

    const newRound = () => {
        console.log(board.getBoard());
        console.log(`${activePlayer.name}'s turn`);
    }
    
    const checkWinner = () => {
        const currentBoard = board.getBoard();

        const hasWinner = winningCombinations.some(([a, b, c]) =>
            currentBoard[a] !== '' &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[a] === currentBoard[c]
        );

        if (hasWinner) return activePlayer;
        if (currentBoard.every(cell => cell !== '')) return 'draw';
        return null;
    }

    const playRound = (index) => {
        if (gameOver) return false;

        const successfulMove = board.placeMarker(index, activePlayer.marker);

        if (!successfulMove) return false;

        const result = checkWinner();

        if (result) {
            gameOver = true;

            if (result === 'draw') return 'Draw';

            activePlayer.addScore();
            console.log(`${activePlayer.name} won!`);
            return result;
        }

        switchActivePlayer();
        newRound();

        return successfulMove;
    }

    newRound();

    return { 
        getActivePlayer,
        getPlayers, 
        playRound, 
        getBoard, 
        resetBoard,
        checkWinner
    }
}

const game = playGame();

function displayGame() {
    const gameProgress = game.getBoard();
    
    const players = game.getPlayers();

    const playerOneName = document.querySelector('.player-one-name');
    playerOneName.textContent = players[0].name;
    const playerOneScore = document.querySelector('.player-one-score');
    playerOneScore.textContent = players[0].getScore();

    const playerTwoName = document.querySelector('.player-two-name');
    playerTwoName.textContent = players[1].name;
    const playerTwoScore = document.querySelector('.player-two-score');
    playerTwoScore.textContent = players[1].getScore();

    const currentActivePlayer = document.querySelector('.active-player');
    currentActivePlayer.textContent = `${game.getActivePlayer().name}'s Turn`;

    const container = document.querySelector('.board-container');
    container.textContent = '';

    gameProgress.forEach((marker, index) => {
        const cell = document.createElement('button');
        cell.textContent = marker;
        cell.classList.add('cell');
        cell.dataset.index = index;

        container.append(cell);

        cell.addEventListener('click', () => {
            game.playRound(index);
            displayGame();
        })
    })
}

displayGame();