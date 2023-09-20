import { Piece } from "./Piece";
import WhiteKnight from "../Assets/WhiteKnight.png";
import BlackKnight from "../Assets/BlackKnight.png";
import { Chessboard } from "./Chessboard";

export class Knight extends Piece {
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
      side === "black" ? BlackKnight : WhiteKnight,
      chessboard
    );
  }

  select() {
    this.chessboard.Tiles.reset();

    this.chessboard.checkTile(this, this.row - 2, this.col + 1);
    this.chessboard.checkTile(this, this.row - 1, this.col + 2);
    this.chessboard.checkTile(this, this.row + 1, this.col + 2);
    this.chessboard.checkTile(this, this.row + 2, this.col + 1);

    this.chessboard.checkTile(this, this.row - 2, this.col - 1);
    this.chessboard.checkTile(this, this.row - 1, this.col - 2);
    this.chessboard.checkTile(this, this.row + 1, this.col - 2);
    this.chessboard.checkTile(this, this.row + 2, this.col - 1);
  }
}
