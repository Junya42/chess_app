import { Piece } from "./Piece";
import WhiteKing from '../Assets/WhiteKing.png';
import BlackKing from '../Assets/BlackKing.png';

export class King extends Piece {

    name: string;
    img: string;

    constructor(row: number, col: number, side: string, name: string) {

        super(row, col, side);
        this.name = name;
        this.img = (side === 'black') ? BlackKing : WhiteKing;
    }
}