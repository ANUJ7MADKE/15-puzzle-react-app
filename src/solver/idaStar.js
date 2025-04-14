import { cloneBoard, getNeighbors, manhattanDistance, isSolved } from "../utils/puzzleUtils";

export function idaStar(start) {
  let threshold = manhattanDistance(start);
  const path = [start];

  while (true) {
    const temp = search(path, 0, threshold);
    if (temp === true) return [...path];
    if (temp === Infinity) return null;
    threshold = temp;
  }
}

function search(path, g, threshold) {
  const node = path[path.length - 1];
  const f = g + manhattanDistance(node);
  if (f > threshold) return f;
  if (isSolved(node)) return true;

  let min = Infinity;
  for (const neighbor of getNeighbors(node)) {
    if (!path.some((p) => JSON.stringify(p) === JSON.stringify(neighbor))) {
      path.push(neighbor);
      const temp = search(path, g + 1, threshold);
      if (temp === true) return true;
      if (temp < min) min = temp;
      path.pop();
    }
  }
  return min;
}
