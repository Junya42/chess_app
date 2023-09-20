import { Piece } from "./Piece";
import WhiteRook from "../Assets/WhiteRook.png";
import BlackRook from "../Assets/BlackRook.png";
import { Chessboard } from "./Chessboard";

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

  select() {
    this.chessboard.Tiles.reset();

    this.attack = [];
    for (let move = this.row + 1; move < 8; move++) {
      //down

      const idx = this.chessboard.checkTile(this, move, this.col);

      if (idx !== -1) break;
    }
    for (let move = this.row - 1; move > -1; move--) {
      //up

      const idx = this.chessboard.checkTile(this, move, this.col);

      if (idx !== -1) break;
    }
    for (let move = this.col + 1; move < 8; move++) {
      //right

      const idx = this.chessboard.checkTile(this, this.row, move);

      if (idx !== -1) break;
    }
    for (let move = this.col - 1; move > -1; move--) {
      //left
      const idx = this.chessboard.checkTile(this, this.row, move);

      if (idx !== -1) break;
    }
  }
}
