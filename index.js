function gameBoard() {
    let board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ]

    const getBoard = () => board;
    const resetBoard = () => board.fill('');

    return { getBoard, resetBoard }
}

function createPlayer(name, marker) {
    return { name, marker } 
}

function playGame() {
    const playerOne = createPlayer('Player One', 'X');
    const playerTwo = createPlayer('Player Two', 'O'); 
}