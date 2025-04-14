import React from "react";
import Tile from "./Tile";
import { isValidMove, moveTile, findBlank } from "../utils/puzzleUtils";

export default function PuzzleBoard({ board, setBoard, size, disabled }) {
  const handleTileClick = (r, c) => {
    if (disabled) return;
    const [blankR, blankC] = findBlank(board);
    if (isValidMove(r, c, blankR, blankC)) {
      const newBoard = moveTile(board, r, c, blankR, blankC);
      setBoard(newBoard);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 60px)`,
        gap: "5px",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      {board.flat().map((val, i) => (
        <Tile
          key={i}
          value={val}
          onClick={() => handleTileClick(Math.floor(i / size), i % size)}
        />
      ))}
    </div>
  );
}
