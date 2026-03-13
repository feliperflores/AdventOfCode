import {read} from "../file_reader.js";

function solve(lines) {
  const grid = buildGrid(lines);
  return getRemovedPapers(grid);
}

function getRemovedPapers(grid, removedPapers = 0) {
  const setForRemoval = markForRemoval(grid);

  if (setForRemoval.length === 0) return removedPapers;

  removedPapers += setForRemoval.length;

  removePapers(grid, setForRemoval);

  return getRemovedPapers(grid, removedPapers);
}

function removePapers(grid, setForRemoval) {
  for (const [i, j] of setForRemoval) {
    grid[i][j] = "x";
  }
}

function markForRemoval(grid) {
  const setForRemoval = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === "@" && countNearPapers(grid, i, j) < 4) {
        setForRemoval.push([i, j]);
      }
    }
  }

  return setForRemoval;
}

function countNearPapers(grid, i, j) {
  let counter = 0;

  const positionsToCheck = [
    [1, 1],
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ];

  positionsToCheck.forEach(([x, y]) => {
    if (grid[i + x]?.[j + y] === "@") counter++;
  })

  return counter;
}

function buildGrid(lines) {
  const grid = [];

  for (let line of lines) {
    grid.push(line.split(""));
  }

  return grid;
}

// read("./example.txt", solve);
read("./input.txt", solve);
