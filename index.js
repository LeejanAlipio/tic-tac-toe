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
    return { name, marker } 
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
        playRound, 
        getBoard, 
        resetBoard,
        checkWinner
    }
}

const game = playGame();