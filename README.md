# Tic-Tac-Toe
A project where I can use my recently gained knowledge about closures, factory functions, and modular patter.

## Preview 
!(Project Image)[image.png]

## Live Page
(Live Page)[https://markleejanalipio.github.io/tic-tac-toe/]

## Pseudocode
1. CREATE a factory function for the gameboard
    - CREATE an array to store all nine placement 
    - CREATE a function that resets the entire array
    - CREATE a function that updates the array using player's marker
    - CREATE a function that returns the array to make the array private
    - RETURN all functions
2. CREATE a factory function `createPlayer` that takes `name` and `marker` for players 
    - RETURN name and marker
3. CREATE a function that controls the flow of the game
    - CREATE the gameboard by calling the gameboard factory function
    - MAKE two players by calling `createPlayer`
        - GIVE player one the marker `X`
        - GIVE player two the marker `O`
    - CREATE an array of winning combinations
    - CREATE an active player 
        - MAKE `playerOne` active by default 
    - CREATE a function that returns the current board
    - CREATE a function that resets the board
    - CREATE a function that switches active player
    - CREATE a function that returns the active player
    - CREATE a function that logs whose turn it is and the live board game
    - CREATE a function that checks if there's a winner
        - GET the current board
        - CHECK if any winning combination has the same marker in all three positions
        - IF there is a winner, RETURN the active player
        - IF the board is full and there is no winner, RETURN draw
        - OTHERWISE, RETURN nothing
    - CREATE a function that plays a round that takes an index as parameter
        - PLACE the active player's marker at the selected index
        - IF the move is not successful, RETURN false
        - CHECK if the move created a winner or draw
        - IF the result is draw, RETURN draw
        - IF the result is a winner, LOG the winner and RETURN the winning player
        - OTHERWISE, switch active player
        - LOG the next player's turn and live board
        - RETURN true
    - START the first round log
    - RETURN the functions needed outside the game controller

