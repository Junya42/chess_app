import { Piece } from "./Piece";
import WhiteBishop from '../Assets/WhiteBishop.png';
import BlackBishop from '../Assets/BlackBishop.png';

export class Bishop extends Piece {

    name: string;
    img: string;

    constructor(row: number, col: number, side: string, name: string) {

        super(row, col, side);
        this.name = name;
        this.img = (side === 'black') ? BlackBishop : WhiteBishop;
    }
}