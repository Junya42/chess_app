import React from "react";
import { Piece } from "./Piece";
import BlackBishop from "../Assets/BlackBishop.png";
import BlackKnight from "../Assets/BlackKnight.png";
import BlackQueen from "../Assets/BlackQueen.png";
import BlackRook from "../Assets/BlackRook.png";
import WhiteBishop from "../Assets/WhiteBishop.png";
import WhiteKnight from "../Assets/WhiteKnight.png";
import WhiteQueen from "../Assets/WhiteQueen.png";
import WhiteRook from "../Assets/WhiteRook.png";

interface Props {
  modal: Piece | null;
  setModal: React.Dispatch<React.SetStateAction<Piece | null>>;
  setSelectedPiece: React.Dispatch<React.SetStateAction<Piece | null>>;
}

export default function UpgradeModal({
  modal,
  setModal,
  setSelectedPiece,
}: Props): React.ReactElement {
  if (!modal) return <></>;

  const upgradePawn = (name: string) => {
    const piece = modal;

    console.log(`upgradePawn ${piece}`);
    if (piece) {
      const idx = piece.chessboard.findPieceIndex(piece.row, piece.col);
      if (idx !== -1) piece.chessboard.upgrade(idx, name);
    }
    setModal(null);
    setSelectedPiece(null);
  };

  return (
    <div className="modal">
      <div className="choice" onClick={() => upgradePawn("queen")}>
        <img
          id="choice-1"
          src={modal.side === "white" ? WhiteQueen : BlackQueen}
          alt="queenchoice"
        />
      </div>
      <div className="choice" onClick={() => upgradePawn("rook")}>
        <img
          id="choice-2"
          src={modal.side === "white" ? WhiteRook : BlackRook}
          alt="rookchoice"
        />
      </div>
      <div className="choice" onClick={() => upgradePawn("bishop")}>
        <img
          id="choice-3"
          src={modal.side === "white" ? WhiteBishop : BlackBishop}
          alt="bishopchoice"
        />
      </div>
      <div className="choice" onClick={() => upgradePawn("knight")}>
        <img
          id="choice-4"
          src={modal.side === "white" ? WhiteKnight : BlackKnight}
          alt="knightchoice"
        />
      </div>
    </div>
  );
}
