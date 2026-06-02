function gameBoard() {
    let board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ]

    const getBoard = () => board;

    return { getBoard }
}

function createPlayer(name, marker) {
    return { name, marker } 
}

function playGame() {
    const playerOne = createPlayer('Player One', 'X');
    const playerTwo = createPlayer('Player Two', 'O'); 
}