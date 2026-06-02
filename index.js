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