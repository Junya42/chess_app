import { Chessboard } from "./Chessboard";

export class Piece {
  row: number;
  col: number;
  moves: number;
  alive: boolean;
  pinned: boolean;
  id: number;
  side: string;
  attack: { row: number; col: number }[];
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
    this.moves = 0;
    this.alive = true;
    this.pinned = false;
    this.id = row * 10 + col;
    this.attack = [];
    this.enpassant = false;
    this.side = side;
    this.name = name;
    this.img = img;
    this.chessboard = chessboard;
  }

  select() {
    console.log(`Select ${this.name}`);
  }

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
    /* if (modalcheck === true)
            setModal(piece);
    */
  }
}
