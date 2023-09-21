import { Piece } from "./Piece";
import WhitePawn from "../Assets/WhitePawn.png";
import BlackPawn from "../Assets/BlackPawn.png";
import { Chessboard } from "./Chessboard";
import { DIRECTION } from "./Direction";

export class Pawn extends Piece {
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
      side === "black" ? BlackPawn : WhitePawn,
      chessboard
    );
  }

  select() {
    this.chessboard.Tiles.reset();

    this.chessboard.Tiles.setStart(this.row, this.col);

    const King = this.chessboard.getKing(this);

    if (this.side === "black") {
      this.attack = [
        { row: this.row + 1, col: this.col - 1 },
        { row: this.row + 1, col: this.col + 1 },
      ];
      const passant_one = this.chessboard.findPieceIndex(
        this.row,
        this.col - 1
      );
      if (
        passant_one !== -1 &&
        this.chessboard.Pieces[passant_one].name === "pawn" &&
        this.chessboard.Pieces[passant_one].side !== this.side &&
        this.chessboard.Pieces[passant_one].enpassant === true
      )
        if (King && King.pinned !== DIRECTION.CLEAR) {
          if (
            this.chessboard.findPinPosition(
              King.pin,
              this.row + 1,
              this.col - 1
            ) !== -1
          )
            this.chessboard.Tiles.setEnPassant(this.row + 1, this.col - 1);
        } else this.chessboard.Tiles.setEnPassant(this.row + 1, this.col - 1);
      const side_one = this.chessboard.findPieceIndex(
        this.row + 1,
        this.col - 1
      );
      if (
        side_one !== -1 &&
        this.chessboard.Pieces[side_one].side !== this.side
      )
        if (King && King.pinned !== DIRECTION.CLEAR) {
          if (
            this.chessboard.findPinPosition(
              King.pin,
              this.row + 1,
              this.col - 1
            ) !== -1
          )
            this.chessboard.Tiles.setAttacked(this.row + 1, this.col - 1);
        } else this.chessboard.Tiles.setAttacked(this.row + 1, this.col - 1);
      const passant_two = this.chessboard.findPieceIndex(
        this.row,
        this.col + 1
      );
      if (
        passant_two !== -1 &&
        this.chessboard.Pieces[passant_two].name === "pawn" &&
        this.chessboard.Pieces[passant_two].side !== this.side &&
        this.chessboard.Pieces[passant_two].enpassant === true
      )
        if (King && King.pinned !== DIRECTION.CLEAR) {
          if (
            this.chessboard.findPinPosition(
              King.pin,
              this.row + 1,
              this.col + 1
            ) !== -1
          )
            this.chessboard.Tiles.setEnPassant(this.row + 1, this.col + 1);
        } else this.chessboard.Tiles.setEnPassant(this.row + 1, this.col + 1);
      const side_two = this.chessboard.findPieceIndex(
        this.row + 1,
        this.col + 1
      );
      if (
        side_two !== -1 &&
        this.chessboard.Pieces[side_two].side !== this.side
      )
        if (King && King.pinned !== DIRECTION.CLEAR) {
          if (
            this.chessboard.findPinPosition(
              King.pin,
              this.row + 1,
              this.col + 1
            ) !== -1
          )
            this.chessboard.Tiles.setAttacked(this.row + 1, this.col + 1);
        } else this.chessboard.Tiles.setAttacked(this.row + 1, this.col + 1);
      if (this.moves === 0) {
        for (let i = 1; i <= 2; i++) {
          if (this.chessboard.findPieceIndex(this.row + i, this.col) !== -1)
            break;
          if (King && King.pinned !== DIRECTION.CLEAR) {
            if (
              this.chessboard.findPinPosition(
                King.pin,
                this.row + i,
                this.col
              ) !== -1
            )
              this.chessboard.Tiles.setAvailable(this.row + i, this.col);
          } else this.chessboard.Tiles.setAvailable(this.row + i, this.col);
        }
      } else {
        if (this.chessboard.findPieceIndex(this.row + 1, this.col) === -1) {
          if (King && King.pinned !== DIRECTION.CLEAR) {
            if (
              this.chessboard.findPinPosition(
                King.pin,
                this.row + 1,
                this.col
              ) !== -1
            )
              this.chessboard.Tiles.setAvailable(this.row + 1, this.col);
          } else this.chessboard.Tiles.setAvailable(this.row + 1, this.col);
        }
      }
    } else {
      this.attack = [
        { row: this.row - 1, col: this.col - 1 },
        { row: this.row - 1, col: this.col + 1 },
      ];
      const passant_one = this.chessboard.findPieceIndex(
        this.row,
        this.col - 1
      );
      if (
        passant_one !== -1 &&
        this.chessboard.Pieces[passant_one].name === "pawn" &&
        this.chessboard.Pieces[passant_one].side !== this.side &&
        this.chessboard.Pieces[passant_one].enpassant === true
      )
        if (King && King.pinned !== DIRECTION.CLEAR) {
          if (
            this.chessboard.findPinPosition(
              King.pin,
              this.row - 1,
              this.col - 1
            ) !== -1
          )
            this.chessboard.Tiles.setEnPassant(this.row - 1, this.col - 1);
        } else this.chessboard.Tiles.setEnPassant(this.row - 1, this.col - 1);
      const passant_two = this.chessboard.findPieceIndex(
        this.row,
        this.col + 1
      );
      if (
        passant_two !== -1 &&
        this.chessboard.Pieces[passant_two].name === "pawn" &&
        this.chessboard.Pieces[passant_two].side !== this.side &&
        this.chessboard.Pieces[passant_two].enpassant === true
      )
        if (King && King.pinned !== DIRECTION.CLEAR) {
          if (
            this.chessboard.findPinPosition(
              King.pin,
              this.row - 1,
              this.col + 1
            ) !== -1
          )
            this.chessboard.Tiles.setEnPassant(this.row - 1, this.col + 1);
        } else this.chessboard.Tiles.setEnPassant(this.row - 1, this.col + 1);
      const side_one = this.chessboard.findPieceIndex(
        this.row - 1,
        this.col - 1
      );
      if (
        side_one !== -1 &&
        this.chessboard.Pieces[side_one].side !== this.side
      )
        if (King && King.pinned !== DIRECTION.CLEAR) {
          if (
            this.chessboard.findPinPosition(
              King.pin,
              this.row - 1,
              this.col - 1
            ) !== -1
          )
            this.chessboard.Tiles.setAttacked(this.row - 1, this.col - 1);
        } else this.chessboard.Tiles.setAttacked(this.row - 1, this.col - 1);
      const side_two = this.chessboard.findPieceIndex(
        this.row - 1,
        this.col + 1
      );
      if (
        side_two !== -1 &&
        this.chessboard.Pieces[side_two].side !== this.side
      )
        if (King && King.pinned !== DIRECTION.CLEAR) {
          if (
            this.chessboard.findPinPosition(
              King.pin,
              this.row - 1,
              this.col + 1
            ) !== -1
          )
            this.chessboard.Tiles.setAttacked(this.row - 1, this.col + 1);
        } else this.chessboard.Tiles.setAttacked(this.row - 1, this.col + 1);
      if (this.moves === 0) {
        for (let i = -1; i >= -2; i--) {
          if (this.chessboard.findPieceIndex(this.row + i, this.col) !== -1)
            break;
          if (King && King.pinned !== DIRECTION.CLEAR) {
            if (
              this.chessboard.findPinPosition(
                King.pin,
                this.row + i,
                this.col
              ) !== -1
            )
              this.chessboard.Tiles.setAvailable(this.row + i, this.col);
          } else this.chessboard.Tiles.setAvailable(this.row + i, this.col);
        }
      } else {
        if (this.chessboard.findPieceIndex(this.row - 1, this.col) === -1) {
          if (King && King.pinned !== DIRECTION.CLEAR) {
            if (
              this.chessboard.findPinPosition(
                King.pin,
                this.row - 1,
                this.col
              ) !== -1
            )
              this.chessboard.Tiles.setAvailable(this.row - 1, this.col);
          } else this.chessboard.Tiles.setAvailable(this.row - 1, this.col);
        }
      }
    }
  }
}
