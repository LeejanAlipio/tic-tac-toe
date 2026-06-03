# Tic-Tac-Toe
A project where I can use my recently gained knowledge about closures, factory functions, and modular patter.

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
    - MAKE two player by calling `createPlayer`
    - CREATE an active player 
        - MAKE `playerOne` active in default 
        - CREATE a function that switches player if move is successful
    - CREATE a function that plays a round that takes an index as parameter
        - WHEN move is successful, switch player

