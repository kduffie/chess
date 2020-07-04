# chess
This implements an interactive game of chess where players are asked at the command line for their moves.

This is being developed in a sequence of exercises eventually culminating in a fully operational game.  The lessons are documented in the lessons folder.

The design is based on a model with a Board containing various ChessPieces.  There are different classes for each type of piece that incorporate the movement rules of the game.  A controller sets up the game and manages the sequencing of moves based on commands issued by the human players.  
