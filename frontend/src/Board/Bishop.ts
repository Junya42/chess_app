import { Piece } from "./Piece";
import WhiteBishop from '../Assets/WhiteBishop.png';
import BlackBishop from '../Assets/BlackBishop.png';
import { Chessboard } from "./Chessboard";

export class Bishop extends Piece {

    constructor(row: number, col: number, side: string, name: string, chessboard: Chessboard) {

        super(row, col, side, name, (side === 'black') ? BlackBishop : WhiteBishop, chessboard);
    }

    select() {

        this.chessboard.Tiles.reset();
        this.attack = []
        for (let x = 1; this.row - x > -1; x++) {
            //top left
        
            if (this.col - x < 0) break;
        
            const idx = this.chessboard.checkTile(this, this.row - x, this.col - x);
        
            if (idx !== -1) break;
          }
        
          for (let x = 1; this.row - x > -1; x++) {
            //top right
            if (this.col + x > 7) break;
        
            const idx = this.chessboard.checkTile(this, this.row - x, this.col + x);
        
            if (idx !== -1) break;
          }
        
          for (let x = 1; this.row + x < 8; x++) {
            //bottom left
        
            if (this.col - x < 0) break;
        
            const idx = this.chessboard.checkTile(this, this.row + x, this.col - x);
        
            if (idx !== -1) break;
          }
        
          for (let x = 1; this.row + x < 8; x++) {
            //bottom right
            if (this.col + x > 7) break;
        
            const idx = this.chessboard.checkTile(this, this.row + x, this.col + x);
        
            if (idx !== -1) break;
          }
    }
}