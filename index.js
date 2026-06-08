const gameBoard = (() => {
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
})();

function createPlayer(name, marker) {
    let score = 0;

    const addScore = () => score++;
    const getScore = () => score;
    return { name, marker, getScore, addScore } 
} 

function playGame(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const playerOne = createPlayer(playerOneName, 'X');
    const playerTwo = createPlayer(playerTwoName, 'O');

    const WINNING_COMBINATIONS = [
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

    let isGameOver = false;

    const getLiveBoard = () => gameBoard.getBoard();
    
    const resetLiveBoard = () => {
        gameBoard.resetBoard();
        activePlayer = playerOne;
        isGameOver = false;
    }
    
    function switchPlayer() {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    const liveRound = () => {
        console.log(`${activePlayer.name}'s turn`);
        console.log(getLiveBoard());
    }

    const hasWinner = () => {
        const board = gameBoard.getBoard();
        return WINNING_COMBINATIONS.some(([a, b, c]) => {
            return (
                board[a] !== '' &&
                board[a] === board[b] &&
                board[a] === board[c]
            );
        });
    }

    const isDraw = () => {
        return gameBoard.getBoard().every(cell => cell !== '');
    }


    const playRound = (index) => {
        if (isGameOver) return false;

        const playerMove = gameBoard.placeMarker(index, activePlayer.marker)
        if (!playerMove) return false;

        if (hasWinner()) {
            activePlayer.addScore();
            isGameOver = true;
            return `${activePlayer.name} won!`;
        }

        if (isDraw()) {
            isGameOver = true;  
            return `Draw`;
        }

        switchPlayer();
        liveRound();

        return true;
    }

    liveRound();

    return {
        getLiveBoard,
        resetLiveBoard,
        liveRound,
        playRound,
    }
};