import { Piece } from "./Piece";
import WhiteKing from './Assets/WhiteKing.png';
import BlackKing from './Assets/BlackKing.png';
import { Chessboard } from "./Chessboard";

export class King extends Piece {

    constructor(row: number, col: number, side: string, name: string, chessboard: Chessboard) {

        super(row, col, side, name, (side === 'black') ? BlackKing : WhiteKing, chessboard);
    }

    select() {
        this.chessboard.Tiles.reset();

        this.chessboard.Tiles.setStart(this.row, this.col);


        const row = this.row;
        const col = this.col;
      
        this.chessboard.checkTile(this, row + 1, col);
        this.chessboard.checkTile(this, row - 1, col);
        this.chessboard.checkTile(this, row, col + 1);
        this.chessboard.checkTile(this, row, col - 1);
        this.chessboard.checkTile(this, row - 1, col - 1);
        this.chessboard.checkTile(this, row - 1, col + 1);
        this.chessboard.checkTile(this, row + 1, col - 1);
        this.chessboard.checkTile(this, row + 1, col + 1);

        if (this.moves === 0) {
            for (let i = this.col - 1; i >= 0; i--) { //left
                const piece = this.chessboard.findPiece(this.row, i);

                const enemies = this.chessboard.getEnemies(this);

                let freeTile: boolean = true;
                if (enemies && i >= this.col - 2) {
                    for (const enemy of enemies) {
                        for (const attackPos of enemy.attack) {
                            if (attackPos.row === this.row && attackPos.col === i) {
                                freeTile = false;
                                break;
                            }
                        }
                        if (freeTile === false)
                            break;
                    }
                    if (freeTile === false)
                        break;
                }

                if (piece && piece.name === 'rook' && piece.moves === 0) {
                    this.chessboard.Tiles.setCastle(this.row, this.col - 2);
                    break;
                } else if (piece) {
                    break ;
                }
            }

            for (let i = this.col + 1; i <= 7; i++) { //right
                const piece = this.chessboard.findPiece(this.row, i);

                const enemies = this.chessboard.getEnemies(this);

                let freeTile: boolean = true;
                
                if (enemies && i <= this.col + 2) {
                    for (const enemy of enemies) {
                        for (const attackPos of enemy.attack) {
                            if (attackPos.row === this.row && attackPos.col === i) {
                                freeTile = false;
                                break;
                            }
                        }
                        if (freeTile === false)
                            break;
                    }
                    if (freeTile === false)
                        break;
                }
                if (piece && piece.name === 'rook' && piece.moves === 0) {
                    this.chessboard.Tiles.setCastle(this.row, this.col + 2);
                    break;
                } else if (piece) {
                    break ;
                }
            }
        }
    }
}