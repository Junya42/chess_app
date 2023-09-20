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
            
            new Rook(7, 0, "white", "rook", this),
            new Knight(7, 1, "white", "knight", this),
            new Bishop(7, 2, "white", "bishop", this),
            new Queen(7, 3, "white", "queen", this),
            new King(7, 4, "white", "king", this),
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
            new Pawn(6, 7, "white", "pawn", this),
        ];
    }

    findPieceIndex = (row: number, col: number) => {
        if (row < 0 || row > 7)
            return -1;
        for (let i = 0; i < this.Pieces.length; i++) {
            const piece = this.Pieces[i];
            if (piece.row === row && piece.col === col) {
                return i;
            }
        }
        return -1;
    }

    findPieceById = (id: number) => {
        return this.Pieces.find((piece: Piece) => piece.id === id);
    }

    checkTile(piece: Piece, row: number, col: number) {
        if (row < 0 || col < 0 || row > 7 || col > 7) return -2;
        const idx = this.findPieceIndex(row, col);
      
        piece.attack.push({ row, col });
      
        if (piece.name === "king") {
          const enemyPieces: Piece[] = this.Pieces.filter(
            (enemyPiece: Piece) => enemyPiece.side !== piece.side
          );
      
          let freeTile: boolean = true;
          for (const enemyPiece of enemyPieces) {
            for (const attackPos of enemyPiece.attack) {
              if (enemyPiece.row === 3) console.log(attackPos);
      
              if (attackPos.row === row && attackPos.col === col) {
                freeTile = false;
                break;
              }
            }
            if (freeTile === false) break;
          }
      
          if (freeTile === false) {
            return idx;
          }
        }
        if (idx === -1) this.Tiles.setAvailable(row, col);
        else if (this.Pieces[idx].side !== piece.side)
            this.Tiles.setAvailable(row, col);
      
        return idx;
      }
}