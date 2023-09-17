import React, { useEffect, useState } from "react";
import "../App.css";
import initialPieces from "./chessPieces";
import Tiles from "./Tiles";
import BlackBishop from '../Assets/BlackBishop.png';
import BlackKnight from '../Assets/BlackKnight.png';
import BlackQueen from '../Assets/BlackQueen.png';
import BlackRook from '../Assets/BlackRook.png';
import WhiteBishop from '../Assets/WhiteBishop.png';
import WhiteKnight from '../Assets/WhiteKnight.png';
import WhiteQueen from '../Assets/WhiteQueen.png';
import WhiteRook from '../Assets/WhiteRook.png';

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
  attack: { row: number; col: number }[];
  enpassant: boolean;
}

const tilesClass = new Tiles();
const chessPieces = initialPieces;

const findPieceIndex = (row: number, col: number) => {
    if (row < 0 || row > 7)
        return -1;
  for (let i = 0; i < chessPieces.length; i++) {
    const piece = chessPieces[i];
    if (piece.row === row && piece.col === col) {
      return i;
    }
  }
  return -1;
};

function findPieceById(id: number): Piece | undefined {
    return initialPieces.find(piece => piece.id === id);
  }

function selectPawn(pawn: Piece) {
  tilesClass.reset();

  if (pawn.side === "black") {
    pawn.attack = [
      { row: pawn.row + 1, col: pawn.col - 1 },
      { row: pawn.row + 1, col: pawn.col + 1 },
    ];
    const passant_one = findPieceIndex(pawn.row, pawn.col - 1);
    if (passant_one !== -1 && chessPieces[passant_one].name === 'pawn' && chessPieces[passant_one].side !== pawn.side && chessPieces[passant_one].enpassant === true)
        tilesClass.setEnPassant(pawn.row + 1, pawn.col - 1);
    const side_one = findPieceIndex(pawn.row + 1, pawn.col - 1);
    if (side_one !== -1 && chessPieces[side_one].side !== pawn.side)
        tilesClass.setAttacked(pawn.row + 1, pawn.col - 1);
    const passant_two = findPieceIndex(pawn.row, pawn.col + 1);
    if (passant_two !== -1 && chessPieces[passant_two].name === 'pawn' && chessPieces[passant_two].side !== pawn.side && chessPieces[passant_two].enpassant === true)
        tilesClass.setEnPassant(pawn.row + 1, pawn.col + 1);
    const side_two = findPieceIndex(pawn.row + 1, pawn.col + 1);
    if (side_two !== -1 && chessPieces[side_two].side !== pawn.side)
        tilesClass.setAttacked(pawn.row + 1, pawn.col + 1);
    if (pawn.move === 0) {
      for (let i = 1; i <= 2; i++) {
        if (findPieceIndex(pawn.row + i, pawn.col) !== -1) break;
        tilesClass.setAvailable(pawn.row + i, pawn.col);
      }
    } else {
      if (findPieceIndex(pawn.row + 1, pawn.col) === -1)
        tilesClass.setAvailable(pawn.row + 1, pawn.col);
    }
  } else {
    pawn.attack = [
      { row: pawn.row - 1, col: pawn.col - 1 },
      { row: pawn.row - 1, col: pawn.col + 1 },
    ];
    const passant_one = findPieceIndex(pawn.row, pawn.col - 1);
    if (passant_one !== -1 && chessPieces[passant_one].name === 'pawn' && chessPieces[passant_one].side !== pawn.side && chessPieces[passant_one].enpassant === true)
        tilesClass.setEnPassant(pawn.row - 1, pawn.col - 1);
    const passant_two = findPieceIndex(pawn.row, pawn.col + 1);
    if (passant_two !== -1 && chessPieces[passant_two].name === 'pawn' && chessPieces[passant_two].side !== pawn.side && chessPieces[passant_two].enpassant === true)
        tilesClass.setEnPassant(pawn.row - 1, pawn.col + 1);
    const side_one = findPieceIndex(pawn.row - 1, pawn.col - 1);
    if (side_one !== -1 && chessPieces[side_one].side !== pawn.side)
        tilesClass.setAttacked(pawn.row - 1, pawn.col - 1);
    const side_two = findPieceIndex(pawn.row - 1, pawn.col + 1)
    if (side_two !== -1 && chessPieces[side_two].side !== pawn.side)
        tilesClass.setAttacked(pawn.row - 1, pawn.col + 1);
    if (pawn.move === 0) {
      for (let i = -1; i >= -2; i--) {
        if (findPieceIndex(pawn.row + i, pawn.col) !== -1) break;
        tilesClass.setAvailable(pawn.row + i, pawn.col);
      }
    } else {
      if (findPieceIndex(pawn.row - 1, pawn.col) === -1)
        tilesClass.setAvailable(pawn.row - 1, pawn.col);
    }
  }
}

function checkTile(piece: Piece, row: number, col: number) {
  if (row < 0 || col < 0 || row > 7 || col > 7) return -2;
  const idx = findPieceIndex(row, col);

  piece.attack.push({ row, col });

  if (piece.name === "king") {
    const enemyPieces: Piece[] = chessPieces.filter(
      (enemyPiece: Piece) => enemyPiece.side !== piece.side
    );

    let freeTile: boolean = true;
    for (const enemyPiece of enemyPieces) {
      for (const attackPos of enemyPiece.attack) {
        if (enemyPiece.row === 3) console.log(attackPos);

        if (attackPos.row === row && attackPos.col === col) {
          freeTile = false;
          break;
        }
      }
      if (freeTile === false) break;
    }

    if (freeTile === false) {
      return idx;
    }
  }
  if (idx === -1) tilesClass.setAvailable(row, col);
  else if (chessPieces[idx].side !== piece.side)
    tilesClass.setAvailable(row, col);

  return idx;
}

function init_attack(piece: Piece) {
  if (piece.name === "pawn") selectPawn(piece);
  else if (piece.name === "rook") selectRook(piece);
  else if (piece.name === "bishop") selectBishop(piece);
  else if (piece.name === "queen") selectQueen(piece);
  else if (piece.name === "king") selectKing(piece);
  else if (piece.name === "knight") selectKnight(piece);
  tilesClass.reset();
}

function selectRook(rook: Piece, isQueen?: number | undefined) {
  tilesClass.reset();

  if (!isQueen) rook.attack = [];
  for (let move = rook.row + 1; move < 8; move++) {
    //down

    const idx = checkTile(rook, move, rook.col);

    if (idx !== -1) break;
  }
  for (let move = rook.row - 1; move > -1; move--) {
    //up

    const idx = checkTile(rook, move, rook.col);

    if (idx !== -1) break;
  }
  for (let move = rook.col + 1; move < 8; move++) {
    //right

    const idx = checkTile(rook, rook.row, move);

    if (idx !== -1) break;
  }
  for (let move = rook.col - 1; move > -1; move--) {
    //left
    const idx = checkTile(rook, rook.row, move);

    if (idx !== -1) break;
  }
}

function selectBishop(bishop: Piece, isQueen?: number | undefined) {
  const row = bishop.row;
  const col = bishop.col;

  if (!isQueen) bishop.attack = [];
  for (let x = 1; row - x > -1; x++) {
    //top left

    if (col - x < 0) break;

    const idx = checkTile(bishop, row - x, col - x);

    if (idx !== -1) break;
  }

  for (let x = 1; row - x > -1; x++) {
    //top right
    if (col + x > 7) break;

    const idx = checkTile(bishop, row - x, col + x);

    if (idx !== -1) break;
  }

  for (let x = 1; row + x < 8; x++) {
    //bottom left

    if (col - x < 0) break;

    const idx = checkTile(bishop, row + x, col - x);

    if (idx !== -1) break;
  }

  for (let x = 1; row + x < 8; x++) {
    //bottom right
    if (col + x > 7) break;

    const idx = checkTile(bishop, row + x, col + x);

    if (idx !== -1) break;
  }
}

function selectQueen(queen: Piece) {
  queen.attack = [];
  selectRook(queen, 1);
  selectBishop(queen, 1);
}

function selectKnight(knight: Piece) {
    const row = knight.row;
    const col = knight.col;

    checkTile(knight, row - 2, col + 1);
    checkTile(knight, row - 1, col + 2);
    checkTile(knight, row + 1, col + 2);
    checkTile(knight, row + 2, col + 1);

    checkTile(knight, row - 2, col - 1);
    checkTile(knight, row - 1, col - 2);
    checkTile(knight, row + 1, col - 2);
    checkTile(knight, row + 2, col - 1);
}

function selectKing(king: Piece) {
  const row = king.row;
  const col = king.col;

  checkTile(king, row + 1, col);
  checkTile(king, row - 1, col);
  checkTile(king, row, col + 1);
  checkTile(king, row, col - 1);
  checkTile(king, row - 1, col - 1);
  checkTile(king, row - 1, col + 1);
  checkTile(king, row + 1, col - 1);
  checkTile(king, row + 1, col + 1);
}

export default function Board(): React.ReactElement {
  const diff: any = { px: 0, side: "none" };
  const [ modal, setModal ] = useState<Piece | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [selectedPos, setSelectedPos] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [render, setRender] = useState<boolean>(false);
  const [turn, setTurn] = useState<string>("white");

  useEffect(() => {
    //initialize attack range of each pieces

    for (const piece of chessPieces) {
      init_attack(piece);
    }
  }, []);


  useEffect(() => {
    //reset each enpassant pieces

    for (const curr of chessPieces) {
        if (curr.side === turn) {
            curr.enpassant = false;
        }
    }
  }, [turn]);

  useEffect(() => {
    //choose a piece and change the tiles colors accordingly

    if (selectedPiece) {
      console.log(`${selectedPiece.name} ${selectedPiece.id}`);

      tilesClass.setStart(selectedPiece.row, selectedPiece.col);
      if (selectedPiece.name === "pawn") selectPawn(selectedPiece);
      else if (selectedPiece.name === "rook") selectRook(selectedPiece);
      else if (selectedPiece.name === "bishop") selectBishop(selectedPiece);
      else if (selectedPiece.name === "queen") selectQueen(selectedPiece);
      else if (selectedPiece.name === "king") selectKing(selectedPiece);
      else if (selectedPiece.name === "knight") selectKnight(selectedPiece);
      setRender(!render);
    }
  }, [selectedPiece]);

  useEffect(() => {
    //move the piece into of the available tiles

    if (selectedPiece && selectedPos) {
      const piece = selectedPiece;

      const idx = findPieceIndex(selectedPos.row, selectedPos.col);
      if (idx !== -1) {
        chessPieces[idx].alive = false;
        chessPieces[idx].row = -1;
      } else if (tilesClass.getColor(selectedPos.row, selectedPos.col) === 'enpassant') {

        if (piece.side === 'white') {

            const _idx = findPieceIndex(selectedPos.row + 1, selectedPos.col);

            if (_idx !== -1 && chessPieces[_idx].name === 'pawn') {
                chessPieces[_idx].alive = false;
                chessPieces[_idx].row = -1;
            }

        } else {

            const _idx = findPieceIndex(selectedPos.row - 1, selectedPos.col);

            if (_idx !== -1 && chessPieces[_idx].name === 'pawn') {
                chessPieces[_idx].alive = false;
                chessPieces[_idx].row = -1;
            }
        }
      }
      if (piece.name === 'pawn') {
        if (piece.move === 0) {
            const dist = selectedPos.row - piece.row;
            if (dist === 2 || dist === -2) {
                piece.enpassant = true;
            }
        } else if (selectedPos.row === 0 || selectedPos.row === 7) {
            setModal(piece);
        }
      }
      piece.row = selectedPos.row;
      piece.col = selectedPos.col;
      piece.move++;
      if (selectedPiece.name === "pawn") selectPawn(selectedPiece);
      else if (selectedPiece.name === "rook") selectRook(selectedPiece);
      else if (selectedPiece.name === "bishop") selectBishop(selectedPiece);
      else if (selectedPiece.name === "queen") selectQueen(selectedPiece);
      else if (selectedPiece.name === "king") selectKing(selectedPiece);
      else if (selectedPiece.name === "knight") selectKnight(selectedPiece);

      if (!modal)
        setSelectedPiece(null);
      setSelectedPos(null);
      tilesClass.reset();
      if (turn === "white") setTurn("black");
      else setTurn("white");
      setRender(!render);
      console.log(`${piece.row} ${piece.col}`);
    }
  }, [selectedPiece, selectedPos, modal]);



  const renderChessPiece = (pieceIndex: number) => {
    if (pieceIndex !== -1) {
      const piece = chessPieces[pieceIndex];

      if (piece.alive === false)
        return null;

      return (
        <img id={`piece-${piece.id}`} src={piece.img} alt={`Piece at ${piece.id}`} />
      );
    }

    return null;
  };

  const renderTiles = () => {
    const tiles = [];
    const numRows = 8;
    const numCols = 8;

    for (let i: number = 0; i < numRows; i++) {
      for (let j: number = 0; j < numCols; j++) {

        let tileColor = tilesClass.getColor(i, j);

        if (tileColor === 'start')
            console.log(`FOUND START ${i} ${j}`);
        const pieceIndex = findPieceIndex(i, j);

        const selectPos = (row: number, col: number) => {

            if (modal)
                return;
          if (selectedPiece) {

            if (tileColor !== "black" && tileColor !== "white" && tileColor !== "default") {
              setSelectedPos({ row, col });
            } else {
              setSelectedPos(null);
              setSelectedPiece(null);
              tilesClass.reset();
            }
          } else if (pieceIndex !== -1) {
            if (chessPieces[pieceIndex].side === turn) {
                tileColor = 'start';
                setSelectedPiece(chessPieces[pieceIndex]);
            }
          }
        };

        tiles.push(
          <div
            key={`${i}${j}`}
            className={`tile ${tileColor}`}
            onClick={() => selectPos(i, j)}
          >
            {renderChessPiece(pieceIndex)}
          </div>
        );
      }
    }

    return tiles;
  };

  const upgradePawn = (img: string, name: string) => {

    const piece = modal;

    console.log(`upgradePawn ${piece}`);
    if (piece) {

        piece.name = name;
        piece.img = img;
    }
    setModal(null);
    setSelectedPiece(null);
  };

  return (
    <>
    <div className="center">
      <div
        className="board"
        style={{
          height: diff.side === "height" ? `${diff.px}%` : "100%",
          width: diff.side === "width" ? `${diff.px}%` : "100%",
        }}
      >
        {modal &&
            <div className="modal">
                <div className="choice" onClick={()=> 
                    upgradePawn(modal.side === 'white' ? WhiteQueen : BlackQueen, "queen")}>
                    <img id="choice-1" src={BlackQueen} alt="queenchoice"/>
                </div>
                <div className="choice" onClick={()=> 
                    upgradePawn(modal.side === 'white' ? WhiteRook : BlackRook, "rook")}>
                    <img id="choice-2" src={BlackRook} alt="rookchoice"/>
                </div>
                <div className="choice" onClick={()=> 
                    upgradePawn(modal.side === 'white' ? WhiteBishop : BlackBishop, "bishop")}>
                    <img id="choice-3" src={BlackBishop} alt="bishopchoice"/>
                </div>
                <div className="choice" onClick={()=> 
                    upgradePawn(modal.side === 'white' ? WhiteKnight : BlackKnight, "knight")}>
                    <img id="choice-4" src={BlackKnight} alt="knightchoice"/>
                </div>
            </div>
        }  
        {renderTiles()}
      </div>
    </div>
    </>
  );
}
