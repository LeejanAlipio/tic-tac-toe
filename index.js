function gameBoard() {
    let board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ]

    const getBoard = () => board;
    const resetBoard = () => board.fill('');
    function placeMarker(index, marker) {
        if (index < 0 || index > 8 || board[index] !== '') return false;
        board[index] = marker
        return true;
    }

    return { getBoard, resetBoard, placeMarker }
}

function createPlayer(name, marker) {
    return { name, marker } 
}

function playGame() {
    const board = gameBoard();
    
    const playerOne = createPlayer('Player One', 'X');
    const playerTwo = createPlayer('Player Two', 'O');
    
    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    function switchActivePlayer() {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }
}