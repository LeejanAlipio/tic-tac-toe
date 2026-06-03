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

    const getBoard = () => board.getBoard();

    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    const getActivePlayer = () => activePlayer;

    const newRound = () => {
        console.log(board.getBoard());
        console.log(`${activePlayer.name}'s turn`);
    }
    
    const playRound = (index) => {
        const successfulMove = board.placeMarker(index, activePlayer.marker);

        if (successfulMove) {
            switchActivePlayer();
        }

        newRound();

        return successfulMove;
    }

    newRound();

    return { getActivePlayer, playRound, getBoard, newRound }
}

const game = playGame();