import { Piece } from "./Piece";
import WhiteKnight from '../Assets/WhiteKnight.png';
import BlackKnight from '../Assets/BlackKnight.png';

export class Knight extends Piece {

    name: string;
    img: string;

    constructor(row: number, col: number, side: string, name: string) {

        super(row, col, side);
        this.name = name;
        this.img = (side === 'black') ? BlackKnight : WhiteKnight;
    }
}