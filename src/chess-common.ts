import { assert } from "console";

export const MIN_ROW = 1;
export const MAX_ROW = 8;
export const MIN_COLUMN = 1;
export const MAX_COLUMN = 8;

export class BoardPosition {
  row: number;
  column: number;
  constructor(row: number, column: number) {
    assert(row >= MIN_ROW && row <= MAX_ROW);
    assert(column >= MIN_COLUMN && column <= MAX_COLUMN);
    this.row = row;
    this.column = column;
  }

  isEqual(other: BoardPosition): boolean {
    return this.row === other.row && this.column === other.column;
  }
}

export type ChessPieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

export type ChessPieceColor = 'white' | 'black';

export interface ChessMove {
  startingPosition: BoardPosition;
  endingPosition: BoardPosition;
  piecesTaken: BoardPosition[];
  sideEffects: ChessMove[];  // e.g., in a king-rook castle move
  endingPieceType: ChessPieceType; // e.g., pawn changes to queen
}

export interface ChessPiece {
  type: ChessPieceType;
  color: ChessPieceColor;
  getAllowedMoves(yourStartingPosition: BoardPosition, board: Board): ChessMove[];
}

export interface ChessPieceWithPosition {
  piece: ChessPiece;
  position: BoardPosition;
}

export interface Board {
  getPieceAtPosition(position: BoardPosition): ChessPiece | null;
}
