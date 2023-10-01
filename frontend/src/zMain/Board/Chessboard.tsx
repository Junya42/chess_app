import { Piece } from "./Piece";
import { Rook } from "./Rook";
import { Pawn } from "./Pawn";
import { Queen } from "./Queen";
import { Knight } from "./Knight";
import { King } from "./King";
import { Bishop } from "./Bishop";
import Tiles from "./Tiles";

export class Chessboard {
  Pieces: Piece[];
  Tiles: Tiles;
  WKing: Piece | null;
  BKing: Piece | null;
  White: Piece[];
  Black: Piece[];

  constructor() {
    this.Tiles = new Tiles();

    this.Pieces = [
      new Rook(0, 0, "black", "rook", this),
      new Knight(0, 1, "black", "knight", this),
      new Bishop(0, 2, "black", "bishop", this),
      new Queen(0, 3, "black", "queen", this),
      new King(0, 4, "black", "king", this),
      new Bishop(0, 5, "black", "bishop", this),
      new Knight(0, 6, "black", "knight", this),
      new Rook(0, 7, "black", "rook", this),
      new Pawn(1, 0, "black", "pawn", this),
      new Pawn(1, 1, "black", "pawn", this),
      new Pawn(1, 2, "black", "pawn", this),
      new Pawn(1, 3, "black", "pawn", this),
      new Pawn(1, 4, "black", "pawn", this),
      new Pawn(1, 5, "black", "pawn", this),
      new Pawn(1, 6, "black", "pawn", this),
      new Pawn(1, 7, "black", "pawn", this),

      new King(7, 4, "white", "king", this),
      new Rook(7, 0, "white", "rook", this),
      new Knight(7, 1, "white", "knight", this),
      new Bishop(7, 2, "white", "bishop", this),
      new Queen(7, 3, "white", "queen", this),
      new Bishop(7, 5, "white", "bishop", this),
      new Knight(7, 6, "white", "knight", this),
      new Rook(7, 7, "white", "rook", this),
      new Pawn(6, 0, "white", "pawn", this),
      new Pawn(6, 1, "white", "pawn", this),
      new Pawn(6, 2, "white", "pawn", this),
      new Pawn(6, 3, "white", "pawn", this),
      new Pawn(6, 4, "white", "pawn", this),
      new Pawn(6, 5, "white", "pawn", this),
      new Pawn(6, 6, "white", "pawn", this),
      new Pawn(6, 7, "white", "pawn", this)

    ];

    let WKing: Piece | null = null;
    let BKing: Piece | null = null;

    for (const piece of this.Pieces) {
      piece.select();
      if (piece.name === "king" && piece.side === "white") WKing = piece;
      else if (piece.name === "king" && piece.side === "black") BKing = piece;
    }
    this.WKing = WKing;
    this.BKing = BKing;
    this.Tiles.reset();
    this.White = this.Pieces.filter((piece: Piece) => piece.side === "white");
    this.Black = this.Pieces.filter((piece: Piece) => piece.side === "black");

  }

  /**
   * Refresh every possible moves for every pieces
   */
  refresh() {
    for (const piece of this.Pieces) {
      piece.select();
    }
  }

  /**
   * This function returns the index of the piece in chessboard.Pieces
   * @param {number} row - piece.row
   * @param {number} col - piece.col
   * @returns {number} Index of the existing piece or -1
   */
  findPieceIndex = (row: number, col: number) => {
    if (row < 0 || row > 7) return -1;
    for (let i = 0; i < this.Pieces.length; i++) {
      const piece = this.Pieces[i];
      if (piece.row === row && piece.col === col) {
        return i;
      }
    }
    return -1;
  };

  findPiece = (row: number, col: number) => {
    if (row < 0 || row > 7) return null;
    for (let i = 0; i < this.Pieces.length; i++) {
      const piece = this.Pieces[i];
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
    return null;
  };

  findPieceById = (id: number) => {
    return this.Pieces.find((piece: Piece) => piece.id === id);
  };

  /**
   * This function returns an array of enemy pieces
   * @param {Piece} piece - Your current piece
   * @returns {Piece[]}
   */
  getEnemies(piece: Piece) {
    if (piece.side === "white") {
      if (this.Black)
        return this.Black.filter((curr : Piece) => curr.alive === true);
      return null;
    }
    if (this.White)
      return this.White.filter((curr: Piece) => curr.alive === true);
    return null;
  }


  getPiecesBySide(side: string) {
    if (side === 'white')
      return this.White;
    return this.Black;
  }

  checkmate(side: string) {
    const movablePieces = this.getPiecesBySide(side).filter((piece: Piece) => piece.alive === true && piece.canMove === true);

    if (movablePieces === null || movablePieces === undefined || movablePieces.length === 0)
      return true;
    //console.log(`side: ${side}`, movablePieces);
    return false;
  }

  getKingBySide(side: string) {
    
    if (side === 'white')
      return this.WKing;
    return this.BKing;
  }

  /**
   * This function returns your king
   * @param {Piece} piece - Your current piece
   * @returns {Piece}
   */
  getKing(piece: Piece) {
    if (piece.side === "white") return this.WKing;
    return this.BKing;
  }

  /**
   * This function check for availables tiles
   * @param {Piece} piece - The chess piece you selected
   * @param {number} row - The row you want to verify
   * @param {number} col - The col you want to verify
   * @param {number} first - Optional
   * @returns
   */

  findPinPosition(
    pin: { row: number; col: number }[] | null,
    row: number,
    col: number
  ) {
    if (pin === null) {
      return 0;
    }

    for (const pinPos of pin) {
      if (pinPos.row === row && pinPos.col === col) {
        return 1;
      }
    }

    return -1;
  }

  checkTile(piece: Piece, row: number, col: number, first: number = 0) {
    if (row < 0 || col < 0 || row > 7 || col > 7) {
      return -2;
    }

    if (first === 0 || first === 1) piece.attack.push({ row, col });
    const idx = this.findPieceIndex(row, col);
    if (idx > -1 && this.Pieces[idx].alive === true && this.Pieces[idx].side === piece.side)
      return -3;
    const king = this.getKing(piece);

    if (king && piece !== king && king.pinned) {

      if (this.findPinPosition(king.pin, row, col) === -1) return -2;
    }
    if (piece.name === "king") {
      const enemyPieces: Piece[] = this.Pieces.filter(
        (enemyPiece: Piece) => enemyPiece.side !== piece.side
      );

      let freeTile: boolean = true;
      for (const enemyPiece of enemyPieces) {
        for (const attackPos of enemyPiece.attack) {
          if (attackPos.row === row && attackPos.col === col) {
            freeTile = false;
            break;
          }
        }
        if (freeTile === false) break;
      }

      if (freeTile === false) {
        return -2;
      }
    }

    if (idx === -1) {
      if (first === 0) {
        this.Tiles.setAvailable(row, col);
        piece.canMove = true;
      }
    } else if (this.Pieces[idx].side !== piece.side) {
      if (first === 0) {
        this.Tiles.setAvailable(row, col);
        piece.canMove = true;
      }
    }

    return idx;
  }

  /**
   * This function promote the pawn into another type of piece
   * @param {number} index - Index of the current pawn in chessboard.Pieces
   * @param {name} name - Name of the type of piece you want to promote to
   * @returns
   */
  upgrade(index: number, name: string) {
    if (index < 0) return;
    const piece = this.Pieces[index];
    if (piece.side === "white") {
      if (name === "queen")
        this.Pieces[index] = new Queen(
          piece.row,
          piece.col,
          "white",
          "queen",
          this
        );
      else if (name === "rook")
        new Rook(piece.row, piece.col, "white", "rook", this);
      else if (name === "knight")
        new Knight(piece.row, piece.col, "white", "knight", this);
      else if (name === "bishop")
        new Bishop(piece.row, piece.col, "white", "bishop", this);

      this.Pieces[index].select();
      this.Tiles.reset();
    }
  }

  /**
   * Render the given piece of the board
   * @param {number} pieceIndex - Index of the piece in chessboard.Pieces
   * @returns An img of the piece
   */
  renderPiece(pieceIndex: number) {
    if (pieceIndex !== -1) {
      const piece = this.Pieces[pieceIndex];

      if (piece.alive === false) return null;

      return (
        <img
          id={`piece-${piece.id}`}
          src={piece.img}
          alt={`Piece at ${piece.id}`}
        />
      );
    }
    return null;
  }
}
