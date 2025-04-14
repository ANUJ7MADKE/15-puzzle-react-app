export function createSolvedBoard(size) {
  let board = [];
  let count = 1;
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(count);
      count++;
    }
    board.push(row);
  }
  board[size - 1][size - 1] = 0; // bottom-right is the blank tile
  return board;
}

export function cloneBoard(board) {
  return board.map((row) => [...row]);
}

export function shuffleBoard(board) {
  let newBoard = cloneBoard(board);
  for (let i = 0; i < 1000; i++) {
    const [br, bc] = findBlank(newBoard);
    const moves = getValidMoves(br, bc, newBoard.length);
    const [r, c] = moves[Math.floor(Math.random() * moves.length)];
    newBoard = moveTile(newBoard, r, c, br, bc);
  }
  return newBoard;
}

export function moveTile(board, r, c, br, bc) {
  const newBoard = cloneBoard(board);
  [newBoard[r][c], newBoard[br][bc]] = [newBoard[br][bc], newBoard[r][c]];
  return newBoard;
}

export function findBlank(board) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
}

export function getValidMoves(r, c, size) {
  const moves = [];
  if (r > 0) moves.push([r - 1, c]);
  if (r < size - 1) moves.push([r + 1, c]);
  if (c > 0) moves.push([r, c - 1]);
  if (c < size - 1) moves.push([r, c + 1]);
  return moves;
}

export function isValidMove(r, c, br, bc) {
  return (
    (Math.abs(r - br) === 1 && c === bc) || (Math.abs(c - bc) === 1 && r === br)
  );
}

export function isSolved(board) {
  const flat = board.flat();
  for (let i = 0; i < flat.length - 1; i++) {
    if (flat[i] !== i + 1) return false;
  }
  return flat[flat.length - 1] === 0;
}

export function getNeighbors(board) {
  const neighbors = [];
  const size = board.length;
  const [br, bc] = findBlank(board);
  const moves = getValidMoves(br, bc, size);

  for (const [r, c] of moves) {
    neighbors.push(moveTile(board, r, c, br, bc));
  }
  return neighbors;
}

export function manhattanDistance(board) {
  let sum = 0;
  const size = board.length;
  
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const value = board[r][c];
      if (value !== 0) {
        const targetRow = Math.floor((value - 1) / size);
        const targetCol = (value - 1) % size;
        sum += Math.abs(r - targetRow) + Math.abs(c - targetCol);
      }
    }
  }
  return sum;
}
