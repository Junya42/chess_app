import React, { useEffect, useState } from "react";
import "../App.css";
import { Chessboard } from "./Chessboard";
import { Piece } from "./Piece";
import UpgradeModal from "./UpgradeModal";
import { DIRECTION } from "./Direction";

const chessboard = new Chessboard();
const tilesClass = chessboard.Tiles;
const chessPieces = chessboard.Pieces;

export default function Board(): React.ReactElement {
  const diff: any = { px: 0, side: "none" };
  const [modal, setModal] = useState<Piece | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [selectedPos, setSelectedPos] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [render, setRender] = useState<boolean>(false);
  const [turn, setTurn] = useState<string>("white");

  useEffect(() => {
    //reset pieces status

    if (chessboard.getKingBySide(turn)?.pinned !== DIRECTION.CLEAR) {
      console.log("PINED");
      
    }
    for (const curr of chessPieces) {
      curr.pinned = DIRECTION.CLEAR;
    }
    for (const curr of chessPieces) {
      if (curr.side === turn) {
        curr.enpassant = false;
      }
      if (curr.alive)
        curr.select();
    }
    tilesClass.reset();
  }, [turn]);

  useEffect(() => {
    //choose a piece and change the tiles colors accordingly

    if (selectedPiece) {

      tilesClass.setStart(selectedPiece.row, selectedPiece.col);
      console.log(selectedPiece);
      /*if (selectedPiece.name !== 'king' && chessboard.getKing(selectedPiece)?.pinned !== DIRECTION.CLEAR)
        console.log("DEFEND YOUR KING");
      else*/
        selectedPiece.select();
      setRender(!render);
    }
  }, [selectedPiece]);

  useEffect(() => {
    //move the piece into of the available tiles

    if (selectedPiece && selectedPos) {
      const piece = selectedPiece;

      if ((piece.row === selectedPos.row && piece.col === selectedPos.col)) {
        setSelectedPos(null);
        setSelectedPiece(null);
        tilesClass.reset();
        return;
      }

      const ret = piece.move(selectedPos.row, selectedPos.col);
      if (ret) setModal(piece);
      piece.select();
      if (!modal) setSelectedPiece(null);
      setSelectedPos(null);
      tilesClass.reset();
      if (turn === "white") setTurn("black");
      else setTurn("white");
      setRender(!render);
      console.log(`${piece.row} ${piece.col}`);
    }
  }, [selectedPiece, selectedPos, modal]);

  const renderTiles = () => {
    const tiles = [];
    const numRows = 8;
    const numCols = 8;

    for (let i: number = 0; i < numRows; i++) {
      for (let j: number = 0; j < numCols; j++) {
        let tileColor = tilesClass.getColor(i, j);

        const pieceIndex = chessboard.findPieceIndex(i, j);

        const selectPos = (row: number, col: number) => {
          if (modal) return;
          if (selectedPiece) {
            if (
              tileColor !== "black" &&
              tileColor !== "white" &&
              tileColor !== "default"
            ) {
              setSelectedPos({ row, col });
            } else {
              setSelectedPos(null);
              setSelectedPiece(null);
              tilesClass.reset();
            }
          } else if (pieceIndex !== -1) {
            if (chessPieces[pieceIndex].side === turn) {
              tileColor = "start";
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
            {chessboard.renderPiece(pieceIndex)}
          </div>
        );
      }
    }

    return tiles;
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
          <UpgradeModal
            modal={modal}
            setModal={setModal}
            setSelectedPiece={setSelectedPiece}
          />
          {renderTiles()}
        </div>
      </div>
    </>
  );
}
