import { Piece } from "./Piece";
import WhitePawn from '../Assets/WhitePawn.png';
import BlackPawn from '../Assets/BlackPawn.png';

export class Pawn extends Piece {

    name: string;
    img: string;

    constructor(row: number, col: number, side: string, name: string) {

        super(row, col, side);
        this.name = name;
        this.img = (side === 'black') ? BlackPawn : WhitePawn;
    }
}