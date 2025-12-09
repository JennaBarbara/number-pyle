# Number Pyle

Number Pyle was originally conceived of as a paper and dice game by another Toronto game developer. The game involves trying to make vertical/horizontal lines between matching numbers on a 9x9 grid. I adapted the game into a browser game using React and Typescript, with React Router to switch between game modes. I humbly consider it a fun way to kill a few minutes here and there.

# Rules

- Look at your current roll, it will be a random number between 1 and 6
- Pick a central cell on either side of the grid as your starting cell, your current roll will be placed there
- Every time you place a number, you will get a new roll. If it's even you may place it on one of the last cell's sides, if it's odd you may place it on one of the cells diagonal to the last cell
- If two of the same number are 1 or more spaces away from each other in a straight, vertical/horizontal line with no other numbers in between, that's a NumberPyle and the cells in between are scored. Each scored cell is one point, and the filled cells can't be used to place numbers later
- The game ends when you can't place your current roll

# Game Modes

## Number Pyre (Bank Mechanic)

This game mode gives players the option to save their current roll for later by placing it in the "bank". If they do, their current roll with be replaced by the current contents of the bank, or a new roll if the bank is empty

## Number Scryre (Look-Ahead Mechanic)

This game mode shows the player what their next two rolls will be, in addition to their current roll
