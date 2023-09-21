import { Piece } from "./Piece";
import WhiteBishop from "../Assets/WhiteBishop.png";
import BlackBishop from "../Assets/BlackBishop.png";
import { Chessboard } from "./Chessboard";
import { DIRECTION } from "./Direction";

export class Bishop extends Piece {
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
      side === "black" ? BlackBishop : WhiteBishop,
      chessboard
    );
  }

  /**
   * Selects the bishop and check every available squares from it's current position to his TopLeft diagonal
   */
  topleft() {
    let first: Piece | null = null;

    let pin: { row: number; col: number }[] = [];
    pin.push({ row: this.row, col: this.col });

    for (let x = 1; this.row - x > -1; x++) {
      //top left

      if (this.col - x < 0) break;

      const idx = this.chessboard.checkTile(
        this,
        this.row - x,
        this.col - x,
        first ? (first.name === "king" ? 1 : 2) : 0
      );

      pin.push({ row: this.row - x, col: this.col - x });
      if (idx > -1) {
        if (!first) {
          first = this.chessboard.Pieces[idx];
          if (first.name === "king" && first.side !== this.side) {
            first.pinned = DIRECTION.DIAG_00_77;
            first.pinnedBy = this;
            first.pin = pin;
          }
        } else if (first) {
          const possibleKing = this.chessboard.Pieces[idx];

          if (possibleKing.name === "king" && possibleKing.side !== this.side) {
            first.pinned = DIRECTION.DIAG_00_77;
            first.pinnedBy = this;
          }
          break;
        }
      } else if (idx === -3)
      return ;
    }
  }

  /**
   * Selects the bishop and check every available squares from it's current position to his TopRight diagonal
   */
  topright() {
    let first: Piece | null = null;

    let pin: { row: number; col: number }[] = [];

    pin.push({ row: this.row, col: this.col });

    for (let x = 1; this.row - x > -1; x++) {
      //top left

      if (this.col + x > 7) break;

      const idx = this.chessboard.checkTile(
        this,
        this.row - x,
        this.col + x,
        first ? (first.name === "king" ? 1 : 2) : 0
      );

      pin.push({ row: this.row - x, col: this.col + x });

      if (idx > -1) {
        if (!first) {
          first = this.chessboard.Pieces[idx];
          if (first.name === "king" && first.side !== this.side) {
            first.pinned = DIRECTION.DIAG_70_07;
            first.pinnedBy = this;
            first.pin = pin;
          }
        } else if (first) {
          const possibleKing = this.chessboard.Pieces[idx];

          if (possibleKing.name === "king" && possibleKing.side !== this.side) {
            first.pinned = DIRECTION.DIAG_70_07;
            first.pinnedBy = this;
          }
          break;
        }
      } else if (idx === -3)
      return ;
    }
  }

  /**
   * Selects the bishop and check every available squares from it's current position to his BotLeft diagonal
   */
  botleft() {
    let first: Piece | null = null;

    let pin: { row: number; col: number }[] = [];

    pin.push({ row: this.row, col: this.col });

    for (let x = 1; this.row + x < 8; x++) {
      //top left

      if (this.col - x < 0) break;

      const idx = this.chessboard.checkTile(
        this,
        this.row + x,
        this.col - x,
        first ? (first.name === "king" ? 1 : 2) : 0
      );

      pin.push({ row: this.row + x, col: this.col - x });
      if (idx > -1) {
        if (!first) {
          first = this.chessboard.Pieces[idx];
          if (first.name === "king" && first.side !== this.side) {
            first.pinned = DIRECTION.DIAG_70_07;
            first.pinnedBy = this;
            first.pin = pin;
          }
        } else if (first) {
          const possibleKing = this.chessboard.Pieces[idx];

          if (possibleKing.name === "king" && possibleKing.side !== this.side) {
            first.pinned = DIRECTION.DIAG_70_07;
            first.pinnedBy = this;
          }
          break;
        }
      } else if (idx === -3)
      return ;
    }
  }

  /**
   * Selects the bishop and check every available squares from it's current position to his BotRight diagonal
   */
  botright() {
    let first: Piece | null = null;

    let pin: { row: number; col: number }[] = [];

    pin.push({ row: this.row, col: this.col });

    for (let x = 1; this.row + x < 8; x++) {
      //top left

      if (this.col + x > 7) break;

      const idx = this.chessboard.checkTile(
        this,
        this.row + x,
        this.col + x,
        first ? (first.name === "king" ? 1 : 2) : 0
      );

      pin.push({ row: this.row + x, col: this.col + x });
      if (idx > -1) {
        if (!first) {
          first = this.chessboard.Pieces[idx];
          if (first.name === "king" && first.side !== this.side) {
            first.pinned = DIRECTION.DIAG_00_77;
            first.pinnedBy = this;
            first.pin = pin;
          }
        } else if (first) {
          const possibleKing = this.chessboard.Pieces[idx];

          if (possibleKing.name === "king" && possibleKing.side !== this.side) {
            first.pinned = DIRECTION.DIAG_00_77;
            first.pinnedBy = this;
          }
          break;
        }
      } else if (idx === -3)
      return ;
    }
  }

  select() {
    this.chessboard.Tiles.reset();

    this.chessboard.Tiles.setStart(this.row, this.col);

    this.attack = [];

    if (this.pinned === DIRECTION.DIAG_00_77 || this.pinned === DIRECTION.CLEAR)
      this.topleft();
    if (this.pinned === DIRECTION.DIAG_00_77 || this.pinned === DIRECTION.CLEAR)
      this.botright();
    if (this.pinned === DIRECTION.DIAG_70_07 || this.pinned === DIRECTION.CLEAR)
      this.topright();
    if (this.pinned === DIRECTION.DIAG_70_07 || this.pinned === DIRECTION.CLEAR)
      this.botleft();
  }
}
