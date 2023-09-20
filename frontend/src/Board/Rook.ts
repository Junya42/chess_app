import { Piece } from "./Piece";
import WhiteRook from '../Assets/WhiteRook.png';
import BlackRook from '../Assets/BlackRook.png';

export class Rook extends Piece {

    name: string;
    img: string;

    constructor(row: number, col: number, side: string, name: string) {

        super(row, col, side);
        this.name = name;
        this.img = (side === 'black') ? BlackRook : WhiteRook;
    }
}