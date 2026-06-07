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