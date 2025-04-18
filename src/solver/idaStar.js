import { cloneBoard, getNeighbors, manhattanDistance, isSolved, findBlank } from "../utils/puzzleUtils";

export function idaStar(start) {
  let threshold = manhattanDistance(start);
  const path = [{ board: start, explanation: "Initial board state" }];

  while (true) {
    const temp = search(path, 0, threshold);
    if (temp === true) return path.map(step => step);
    if (temp === Infinity) return null;
    threshold = temp;
  }
}

function search(path, g, threshold) {
  const current = path[path.length - 1];
  const node = current.board;
  const f = g + manhattanDistance(node);
  if (f > threshold) return f;
  if (isSolved(node)) return true;

  let min = Infinity;
  for (const neighbor of getNeighborsWithExplanations(node)) {
    if (!path.some((p) => JSON.stringify(p.board) === JSON.stringify(neighbor.board))) {
      path.push(neighbor);
      const temp = search(path, g + 1, threshold);
      if (temp === true) return true;
      if (temp < min) min = temp;
      path.pop();
    }
  }
  return min;
}

// New function to generate explanations for each move
function getNeighborsWithExplanations(board) {
  const neighbors = [];
  const size = board.length;
  const [blankR, blankC] = findBlank(board);
  
  // Check each possible direction to move the blank tile
  // Up - move tile down into blank space
  if (blankR > 0) {
    const newBoard = moveAndExplain(board, blankR - 1, blankC, blankR, blankC, "down");
    neighbors.push(newBoard);
  }
  
  // Down - move tile up into blank space
  if (blankR < size - 1) {
    const newBoard = moveAndExplain(board, blankR + 1, blankC, blankR, blankC, "up");
    neighbors.push(newBoard);
  }
  
  // Left - move tile right into blank space
  if (blankC > 0) {
    const newBoard = moveAndExplain(board, blankR, blankC - 1, blankR, blankC, "right");
    neighbors.push(newBoard);
  }
  
  // Right - move tile left into blank space
  if (blankC < size - 1) {
    const newBoard = moveAndExplain(board, blankR, blankC + 1, blankR, blankC, "left");
    neighbors.push(newBoard);
  }
  
  return neighbors;
}

function moveAndExplain(board, r, c, br, bc, direction) {
  const newBoard = cloneBoard(board);
  const tileValue = board[r][c];
  
  // Swap the tile with the blank
  [newBoard[r][c], newBoard[br][bc]] = [newBoard[br][bc], newBoard[r][c]];
  
  // Create explanation
  const explanation = `Move tile ${tileValue} ${direction}`;
  
  return {
    board: newBoard,
    explanation: explanation,
    movedTile: tileValue,
    direction: direction
  };
}
