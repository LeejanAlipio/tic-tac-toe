# Tic-Tac-Toe

A small browser game built to practice closures, factory functions, and JavaScript modules.

## Preview

![Project Image](/image.png)

## Live Page

[Live Page](https://tic-tac-toe-zeta-eight-51.vercel.app/?Player-one-name=&Player-two-name=#)

## How It Works

- `GameBoard` is an IIFE that keeps the board array private and exposes methods to read, reset, and update it.
- `createPlayer(name, marker)` is a factory function that creates a player with private score state.
- `createGame(playerOneName, playerTwoName)` controls turns, validates moves, detects wins and draws, and updates scores.
- `UIController` is an IIFE that connects the game logic to the form, board, score displays, and reset controls.

## Game Flow

1. Enter two player names and start the game.
2. Player One starts with `X`; Player Two uses `O`.
3. Players take turns selecting an empty cell.
4. The game ends when a player completes a row, column, or diagonal, or when the board is full.
5. **Play Again** clears the board and keeps the scores.
6. **Reset Game** clears the board, scores, and player names so a new game can start.

## Pseudocode

1. CREATE an IIFE for the gameboard
   - CREATE an array to store all nine placements
   - CREATE a function that resets the entire array
   - CREATE a function that updates the array using the player's marker
   - CREATE a function that returns a copy of the array to keep the board private
   - RETURN all board functions needed by the game
2. CREATE a factory function `createPlayer` that takes `name` and `marker`
   - STORE the player's score privately
   - RETURN the player's name, marker, and score functions
3. CREATE a function that controls the flow of the game
   - USE the gameboard module
   - MAKE two players by calling `createPlayer`
     - GIVE player one the marker `X`
     - GIVE player two the marker `O`
   - CREATE an array of winning combinations
   - CREATE an active player
     - MAKE `playerOne` active by default
   - CREATE a function that returns the current board
   - CREATE a function that returns both players
   - CREATE a function that returns the active player
   - CREATE a function that returns the game status
   - CREATE a function that switches the active player
   - CREATE a function that resets the board and starts the game again
   - CREATE a function that checks if there is a winner
     - GET the current board
     - CHECK if any winning combination has the same marker in all three positions
     - IF there is a winner, return true
   - CREATE a function that checks if the board is full
     - IF every cell is occupied, return true
   - CREATE a function that plays a round using a cell index
     - IF the game is over, return false
     - PLACE the active player's marker
     - IF the move is not successful, return false
     - IF there is a winner, add one point to the active player's score and end the game
     - IF the board is full, end the game with a draw
     - OTHERWISE, switch to the other player
     - RETURN true
   - RETURN the functions needed outside the game controller
4. CREATE an IIFE for the UI controller
   - CONNECT the game to the form, board, player names, scores, and buttons
   - START a game when the form is submitted
   - RENDER the board and handle cell clicks
   - DISPLAY the winner or draw when the game ends
   - LET `PLAY AGAIN` reset the board while keeping the scores
   - LET `RESET GAME` clear the board, scores, and player names
