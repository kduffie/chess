import 'mocha';
import { Pawn } from './pawn';
import * as assert from 'assert';
import { Board, BoardPosition, ChessPieceWithPosition, ChessPiece } from './chess-common';

class SampleBoard implements Board {
  private positionedPieces: ChessPieceWithPosition[] = [];
  addPiece(piece: ChessPiece, position: BoardPosition): void {
    this.positionedPieces.push({ piece: piece, position: position });
  }

  getPieceAtPosition(position: BoardPosition): ChessPiece | null {
    for (const positionedPiece of this.positionedPieces) {
      if (positionedPiece.position.isEqual(position)) {
        return positionedPiece.piece;
      }
    }
    return null;
  }
}

describe('Verify simple moves', () => {
  it('should have two basic moves to start', () => {
    const board = new SampleBoard();
    const pawn = new Pawn('white');
    const position = new BoardPosition(2, 3);
    board.addPiece(pawn, position);
    assert(pawn.color === 'white', 'Pawn has forgotten its color');
    assert(pawn.type === 'pawn', 'Pawn doesn\'t know its type');
    const basicMoves = pawn.getAllowedMoves(position, board);
    assert(basicMoves.length > 0, 'No allowed moves were returned');
    let foundMove1 = false;
    let foundMove2 = false;
    for (const move of basicMoves) {
      assert(move.startingPosition.isEqual(position), 'Starting position is not reported correctly');
      assert(move.endingPieceType === 'pawn', 'No piece type change permitted');
      assert(move.piecesTaken.length === 0, 'No pieces can be taken');
      assert(move.sideEffects.length === 0, 'No side-effects possible');
      if (move.endingPosition.isEqual(new BoardPosition(3, 3))) {
        foundMove1 = true;
      } else if (move.endingPosition.isEqual(new BoardPosition(3, 4))) {
        foundMove2 = true;
      }
      assert(foundMove1, 'It failed to find the basic move ahead by one position');
      assert(foundMove2, 'It failed to find the allowed initial move ahead by two');
    }
  });
});