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
        board[index] = marker
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
    
    let activePlayer = playerOne;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
        console.log(`${activePlayer.name}'s turn`);
    }

    const playRound = (index) => {
        const successfulMove = board.placeMarker(index, activePlayer.marker);

        if (successfulMove) {
            switchActivePlayer();
        }

        return successfulMove;
    }

    const getBoard = () => board.getBoard();
    const getActivePlayer = () => activePlayer;

    return { getActivePlayer, playRound, getBoard }
}

const game = playGame();