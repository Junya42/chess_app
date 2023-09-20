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
            new Rook(0, 0, "black", "rook"),
            new Knight(0, 1, "black", "knight"),
            new Bishop(0, 2, "black", "bishop"),
            new Queen(0, 3, "black", "queen"),
            new King(0, 4, "black", "king"),
            new Bishop(0, 5, "black", "bishop"),
            new Knight(0, 6, "black", "knight"),
            new Rook(0, 7, "black", "rook"),
            new Pawn(1, 0, "black", "pawn"),
            new Pawn(1, 1, "black", "pawn"),
            new Pawn(1, 2, "black", "pawn"),
            new Pawn(1, 3, "black", "pawn"),
            new Pawn(1, 4, "black", "pawn"),
            new Pawn(1, 5, "black", "pawn"),
            new Pawn(1, 6, "black", "pawn"),
            new Pawn(1, 7, "black", "pawn"),
            new Rook(0, 0, "black", "rook"),

            new Knight(0, 1, "white", "knight"),
            new Bishop(0, 2, "white", "bishop"),
            new Queen(0, 3, "white", "queen"),
            new King(0, 4, "white", "king"),
            new Bishop(0, 5, "white", "bishop"),
            new Knight(0, 6, "white", "knight"),
            new Rook(0, 7, "white", "rook"),
            new Pawn(1, 0, "white", "pawn"),
            new Pawn(1, 1, "white", "pawn"),
            new Pawn(1, 2, "white", "pawn"),
            new Pawn(1, 3, "white", "pawn"),
            new Pawn(1, 4, "white", "pawn"),
            new Pawn(1, 5, "white", "pawn"),
            new Pawn(1, 6, "white", "pawn"),
            new Pawn(1, 7, "white", "pawn"),
        ]
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
}