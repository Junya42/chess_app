import { Piece } from "./Piece";
import WhiteQueen from "./Assets/WhiteQueen.png";
import BlackQueen from "./Assets/BlackQueen.png";
import { Chessboard } from "./Chessboard";
import { DIRECTION } from "./Direction";

export class Queen extends Piece {
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
      side === "black" ? BlackQueen : WhiteQueen,
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
      } else if (idx === -3)
      return ;
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
      } else if (idx === -3)
      return ;
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
      } else if (idx === -3)
      return ;
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
      } else if (idx === -3)
      return ;
    }
  }

  topleft() {
    let first: Piece | null = null;

    let pin: { row: number; col: number }[] = [];
    pin.push({ row: this.row, col: this.col });

    for (let x = 1; this.row - x > -1; x++) {
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
    this.attack = [];

    this.chessboard.Tiles.setStart(this.row, this.col);

    if (this.pinned === DIRECTION.VERTICAL || this.pinned === DIRECTION.CLEAR)
      this.up();
    if (this.pinned === DIRECTION.VERTICAL || this.pinned === DIRECTION.CLEAR)
      this.down();
    if (this.pinned === DIRECTION.HORIZONTAL || this.pinned === DIRECTION.CLEAR)
      this.left();
    if (this.pinned === DIRECTION.HORIZONTAL || this.pinned === DIRECTION.CLEAR)
      this.right();
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
