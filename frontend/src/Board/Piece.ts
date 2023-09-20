export class Piece {
    row: number;
    col: number;
    move: number;
    alive: boolean;
    pinned: boolean;
    id: number;
    side: string;
    attack: {row: number, col: number}[];
    enpassant: boolean;

    constructor(row: number, col: number, side: string) {
        this.row = row;
        this.col = col;
        this.move = 0;
        this.alive = true;
        this.pinned = false;
        this.id = (row * 10 + col);
        this.attack = [];
        this.enpassant = false;
        this.side = side;
    }
}