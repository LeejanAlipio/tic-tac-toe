import { createPlayer } from "./create-player.js";

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

export { createGame }