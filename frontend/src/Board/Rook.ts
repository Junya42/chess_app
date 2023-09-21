import { Piece } from "./Piece";
import WhiteRook from "../Assets/WhiteRook.png";
import BlackRook from "../Assets/BlackRook.png";
import { Chessboard } from "./Chessboard";
import { DIRECTION } from "./Direction";

export class Rook extends Piece {
  constructor(
    row: number,
    col: number,
    side: string,
    name: string,
    chessboard: Chessboard
  ) {
    super(
      row,
      col,
      side,
      name,
      side === "black" ? BlackRook : WhiteRook,
      chessboard
    );
  }

  down() {
    let first: Piece | null = null;
    let pin: { row: number; col: number }[] = [];

    pin.push({ row: this.row, col: this.col });

    for (let move = this.row + 1; move < 8; move++) {
      const idx = this.chessboard.checkTile(
        this,
        move,
        this.col,
        first ? (first.name === "king" ? 1 : 2) : 0
      );

      pin.push({ row: move, col: this.col });
      if (idx > -1) {
        if (!first) {
          first = this.chessboard.Pieces[idx];
          if (first.name === "king" && first.side !== this.side) {
            first.pinned = DIRECTION.VERTICAL;
            first.pinnedBy = this;
            first.pin = pin;
          }
        } else if (first) {
          const possibleKing = this.chessboard.Pieces[idx];

          if (possibleKing.name === "king" && possibleKing.side !== this.side) {
            first.pinned = DIRECTION.VERTICAL;
            first.pinnedBy = this;
          }
          break;
        }
      }
    }
  }

  up() {
    let first: Piece | null = null;
    let pin: { row: number; col: number }[] = [];

    pin.push({ row: this.row, col: this.col });

    for (let move = this.row - 1; move > -1; move--) {
      const idx = this.chessboard.checkTile(
        this,
        move,
        this.col,
        first ? (first.name === "king" ? 1 : 2) : 0
      );
      pin.push({ row: move, col: this.col });

      if (idx > -1) {
        if (!first) {
          first = this.chessboard.Pieces[idx];
          if (first.name === "king" && first.side !== this.side) {
            first.pinned = DIRECTION.VERTICAL;
            first.pinnedBy = this;
            first.pin = pin;
          }
        } else if (first) {
          const possibleKing = this.chessboard.Pieces[idx];

          if (possibleKing.name === "king" && possibleKing.side !== this.side) {
            first.pinned = DIRECTION.VERTICAL;
            first.pinnedBy = this;
          }
          break;
        }
      }
    }
  }

  left() {
    let first: Piece | null = null;
    let pin: { row: number; col: number }[] = [];

    pin.push({ row: this.row, col: this.col });
    for (let move = this.col - 1; move > -1; move--) {
      const idx = this.chessboard.checkTile(
        this,
        this.row,
        move,
        first ? (first.name === "king" ? 1 : 2) : 0
      );

      pin.push({ row: this.row, col: move });

      if (idx > -1) {
        if (!first) {
          first = this.chessboard.Pieces[idx];
          if (first.name === "king" && first.side !== this.side) {
            first.pinned = DIRECTION.HORIZONTAL;
            first.pinnedBy = this;
            first.pin = pin;
          }
        } else if (first) {
          const possibleKing = this.chessboard.Pieces[idx];

          if (possibleKing.name === "king" && possibleKing.side !== this.side) {
            first.pinned = DIRECTION.HORIZONTAL;
            first.pinnedBy = this;
          }
          break;
        }
      }
    }
  }

  right() {
    let first: Piece | null = null;
    let pin: { row: number; col: number }[] = [];

    pin.push({ row: this.row, col: this.col });
    for (let move = this.col + 1; move < 8; move++) {
      const idx = this.chessboard.checkTile(
        this,
        this.row,
        move,
        first ? (first.name === "king" ? 1 : 2) : 0
      );

      pin.push({ row: this.row, col: move });

      if (idx > -1) {
        if (!first) {
          first = this.chessboard.Pieces[idx];
          if (first.name === "king" && first.side !== this.side) {
            first.pinned = DIRECTION.HORIZONTAL;
            first.pinnedBy = this;
            first.pin = pin;
          }
        } else if (first) {
          const possibleKing = this.chessboard.Pieces[idx];

          if (possibleKing.name === "king" && possibleKing.side !== this.side) {
            first.pinned = DIRECTION.HORIZONTAL;
            first.pinnedBy = this;
          }
          break;
        }
      }
    }
  }

  select() {
    this.chessboard.Tiles.reset();

    this.chessboard.Tiles.setStart(this.row, this.col);

    this.attack = [];

    if (this.pinned === DIRECTION.VERTICAL || this.pinned === DIRECTION.CLEAR)
      this.up();
    if (this.pinned === DIRECTION.VERTICAL || this.pinned === DIRECTION.CLEAR)
      this.down();
    if (this.pinned === DIRECTION.HORIZONTAL || this.pinned === DIRECTION.CLEAR)
      this.left();
    if (this.pinned === DIRECTION.HORIZONTAL || this.pinned === DIRECTION.CLEAR)
      this.right();
  }
}
