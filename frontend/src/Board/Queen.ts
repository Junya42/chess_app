import { Piece } from "./Piece";
import WhiteQueen from '../Assets/WhiteQueen.png';
import BlackQueen from '../Assets/BlackQueen.png';
import { Chessboard } from "./Chessboard";

export class Queen extends Piece {

    constructor(row: number, col: number, side: string, name: string, chessboard: Chessboard) {

        super(row, col, side, name, (side === 'black') ? BlackQueen : WhiteQueen, chessboard);
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