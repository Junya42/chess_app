import { Piece } from "./Piece";
import WhiteKing from '../Assets/WhiteKing.png';
import BlackKing from '../Assets/BlackKing.png';
import { Chessboard } from "./Chessboard";
import { DIRECTION } from "./Direction";

export class King extends Piece {

    constructor(row: number, col: number, side: string, name: string, chessboard: Chessboard) {

        super(row, col, side, name, (side === 'black') ? BlackKing : WhiteKing, chessboard);
    }

    select() {
        this.chessboard.Tiles.reset();

        this.chessboard.Tiles.setStart(this.row, this.col);


        const row = this.row;
        const col = this.col;
      
        if (this.pinned !== DIRECTION.CLEAR)
            console.log("XXXXXXXXXXXX");
        if (this.chessboard.checkTile(this, row + 1, col) !== -2)
            console.log("KING DOWN");
        if (this.chessboard.checkTile(this, row - 1, col) !== -2)
            console.log("KING UP");
        if (this.chessboard.checkTile(this, row, col + 1) !== -2)
            console.log("KING RIGHT");
        if (this.chessboard.checkTile(this, row, col - 1) !== -2)
            console.log("KING LEFT");
        if (this.chessboard.checkTile(this, row - 1, col - 1) !== -2)
            console.log("KING TOP LEFT");
        if (this.chessboard.checkTile(this, row - 1, col + 1) !== -2)
            console.log("KING TOP RIGHT");
        if (this.chessboard.checkTile(this, row + 1, col - 1) !== -2)
            console.log("KING BOT LEFT");
        if (this.chessboard.checkTile(this, row + 1, col + 1) !== -2)
            console.log("KING BOT RIGHT");
    }
}