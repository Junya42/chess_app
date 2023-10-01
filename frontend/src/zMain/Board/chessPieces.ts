import BlackBishop from '../../Assets/BlackBishop.png';
import BlackKnight from './Assets/BlackKnight.png';
import BlackQueen from './Assets/BlackQueen.png';
import BlackKing from './Assets/BlackKing.png';
import BlackPawn from './Assets/BlackPawn.png';
import BlackRook from './Assets/BlackRook.png';
import WhiteBishop from './Assets/WhiteBishop.png';
import WhiteKnight from './Assets/WhiteKnight.png';
import WhiteQueen from './Assets/WhiteQueen.png';
import WhiteKing from './Assets/WhiteKing.png';
import WhitePawn from './Assets/WhitePawn.png';
import WhiteRook from './Assets/WhiteRook.png';

interface Piece {
  row: number;
  col: number;
  move: number;
  img: string;
  alive: boolean;
  pinned: boolean;
  name: string;
  id: number;
  side: string;
  attack: {row: number, col: number}[];
  enpassant: boolean;
}

let createPiece = (row: number, col: number, img: string, name: string, side: string): Piece => ({
  row,
  col,
  move: 0,
  img,
  alive: true,
  pinned: false,
  name,
  id: (row * 10 + col),
  side,
  attack: [],
  enpassant: false,
});

let initialPieces: Piece[] = [
    createPiece(0, 0, BlackRook, "rook", "black"),
    createPiece(0, 1, BlackKnight, "knight", "black"),
    createPiece(0, 2, BlackBishop, "bishop", "black"),
    createPiece(0, 3, BlackQueen, "queen", "black"),
    createPiece(0, 4, BlackKing, "king", "black"),
    createPiece(0, 5, BlackBishop, "bishop", "black"),
    createPiece(0, 6, BlackKnight, "knight", "black"),
    createPiece(0, 7, BlackRook, "rook", "black"),
    createPiece(1, 0, BlackPawn, "pawn", "black"),
    createPiece(1, 1, BlackPawn, "pawn", "black"),
    createPiece(1, 2, BlackPawn, "pawn", "black"),
    createPiece(1, 3, BlackPawn, "pawn", "black"),
    createPiece(1, 4, BlackPawn, "pawn", "black"),
    createPiece(1, 5, BlackPawn, "pawn", "black"),
    createPiece(1, 6, BlackPawn, "pawn", "black"),
    createPiece(1, 7, BlackPawn, "pawn", "black"),
    createPiece(6, 0, WhitePawn, "pawn", "white"),
    createPiece(6, 1, WhitePawn, "pawn", "white"),
    createPiece(6, 2, WhitePawn, "pawn", "white"),
    createPiece(6, 3, WhitePawn, "pawn", "white"),
    createPiece(6, 4, WhitePawn, "pawn", "white"),
    createPiece(6, 5, WhitePawn, "pawn", "white"),
    createPiece(6, 6, WhitePawn, "pawn", "white"),
    createPiece(6, 7, WhitePawn, "pawn", "white"),
    createPiece(7, 0, WhiteRook, "rook", "white"),
    createPiece(7, 1, WhiteKnight, "knight", "white"),
    createPiece(7, 2, WhiteBishop, "bishop", "white"),
    createPiece(7, 3, WhiteQueen, "queen", "white"),
    createPiece(7, 4, WhiteKing, "king", "white"),
    createPiece(7, 5, WhiteBishop, "bishop", "white"),
    createPiece(7, 6, WhiteKnight, "knight", "white"),
    createPiece(7, 7, WhiteRook, "rook", "white"),
];

export default initialPieces;
