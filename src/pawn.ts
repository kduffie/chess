import { ChessPiece, ChessPieceColor, ChessPieceType, Board, ChessMove, BoardPosition } from "./chess-common";

export class Pawn implements ChessPiece {
  type: ChessPieceType = 'pawn';
  color: ChessPieceColor;

  constructor(color: ChessPieceColor) {
    this.color = color;
  }

  getAllowedMoves(yourStartingPosition: BoardPosition, board: Board): ChessMove[] {
    const result: ChessMove[] = [];
    return result;
  }

}