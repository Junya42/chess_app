import { Piece } from "./Piece";
import WhiteQueen from '../Assets/WhiteQueen.png';
import BlackQueen from '../Assets/BlackQueen.png';

export class Queen extends Piece {

    name: string;
    img: string;

    constructor(row: number, col: number, side: string, name: string) {

        super(row, col, side);
        this.name = name;
        this.img = (side === 'black') ? BlackQueen : WhiteQueen;
    }
}