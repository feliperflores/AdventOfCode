import {read} from "../file_reader.js";

function solve(lines) {
  const grid = lines.map(line => line.split(""));
  const [startAtI, startAtJ] = findS(grid);

  return dfs(grid, startAtI + 1, startAtJ);
}

function dfs(grid, i, j, visited = new Map()) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[i].length) return 1;

  if (visited.has(`${i} ${j}`)) {
    return visited.get(`${i} ${j}`);
  }

  if (grid[i][j] === ".") {
    return dfs(grid, i + 1, j, visited);
  }

  if (grid[i][j] === "^") {
    const left = dfs(grid, i + 1, j - 1, visited);
    const right = dfs(grid, i + 1, j + 1, visited);
    const curr = left + right;

    visited.set(`${i} ${j}`, curr);

    return curr;
  }
}

function dfsSlow(grid, i, j) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[i].length) return 1;

  if (grid[i][j] === ".") {
    return dfs(grid, i + 1, j);
  }

  if (grid[i][j] === "^") {
    const left = dfs(grid, i + 1, j - 1);
    const right = dfs(grid, i + 1, j + 1);
    return left + right;
  }
}

function findS(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "S") return [i, j];
    }
  }
}

// read("./example.txt", solve);
read("./input.txt", solve);
