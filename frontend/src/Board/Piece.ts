import { Chessboard } from "./Chessboard";
import { DIRECTION } from "./Direction";

export class Piece {
  row: number;
  col: number;
  canMove: boolean;
  moves: number;
  alive: boolean;
  pinned: number;
  pinnedBy: Piece | null;
  id: number;
  side: string;
  attack: { row: number; col: number }[];
  pin: { row: number; col: number}[] | null;
  enpassant: boolean;
  img: string;
  name: string;
  chessboard: Chessboard;

  constructor(
    row: number,
    col: number,
    side: string,
    name: string,
    img: string,
    chessboard: Chessboard
  ) {
    this.row = row;
    this.col = col;
    this.canMove = false;
    this.moves = 0;
    this.alive = true;
    this.pinned = DIRECTION.CLEAR;
    this.id = row * 10 + col;
    this.attack = [];
    this.pin = null;
    this.enpassant = false;
    this.side = side;
    this.name = name;
    this.img = img;
    this.chessboard = chessboard;
    this.pinnedBy = null;
  }

  /**
 * Selects the chess piece and performs various actions related to the selection.
 */
  select() {
    console.log(`Select ${this.name}`);
  }

  /**
   * This function moves a piece to a selected tile
   * @param {number} row - Row position of the selected tile
   * @param {number} col - Col Position of the selected tile
   * @returns {boolean} True if a pawn get to promote
   */
  move(row: number, col: number): boolean {
    let modalcheck = false;
    const idx = this.chessboard.findPieceIndex(row, col);
    if (idx !== -1) {
      this.chessboard.Pieces[idx].alive = false;
      this.chessboard.Pieces[idx].row = -1;
    } else if (this.chessboard.Tiles.getColor(row, col) === "enpassant") {
      if (this.side === "white") {
        const _idx = this.chessboard.findPieceIndex(row + 1, col);

        if (_idx !== -1 && this.chessboard.Pieces[_idx].name === "pawn") {
          this.chessboard.Pieces[_idx].alive = false;
          this.chessboard.Pieces[_idx].row = -1;
        }
      } else {
        const _idx = this.chessboard.findPieceIndex(row - 1, col);

        if (_idx !== -1 && this.chessboard.Pieces[_idx].name === "pawn") {
          this.chessboard.Pieces[_idx].alive = false;
          this.chessboard.Pieces[_idx].row = -1;
        }
      }
    }
    if (this.name === "pawn") {
      if (this.moves === 0) {
        const dist = row - this.row;
        if (dist === 2 || dist === -2) {
          this.enpassant = true;
        }
      } else if (row === 0 || row === 7) {
        modalcheck = true;
      }
    }
    this.row = row;
    this.col = col;
    this.moves++;
    return modalcheck;
  }
}
