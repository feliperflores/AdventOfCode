import {read} from "../file_reader.js";

function solve(lines) {
  const grid = lines.map(line => line.split(""));
  let splits = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "S") {
        grid[i + 1][j] = "|";
      }

      if (grid[i][j] === "^" && grid[i-1]?.[j] === "|") {
        splits++;
        grid[i][j - 1] = "|";
        grid[i][j + 1] = "|";
        continue;
      }

      if (grid[i - 1]?.[j] === "|") {
        grid[i][j] = "|";
      }
    }
  }

  return splits;
}

function recursiveSolve(lines) {
  const grid = lines.map(line => line.split(""));
  const [startAtI, startAtJ] = findS(grid);
  return dfs(grid, startAtI + 1, startAtJ);
}

function dfs(grid, i, j, comingFromLeft = false) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[i].length) {
    return 0;
  }

  if (grid[i][j] === "|") return 0;

  if (grid[i][j] === "^") {
    grid[i][j - 1] = "|";
    grid[i][j + 1] = "|";

    if (comingFromLeft) {
      const left = dfs(grid, i + 1, j - 1, true);
      const right = 1 + dfs(grid, i + 1, j + 1, false);
      return left + right;
    }

    const left = 1 + dfs(grid, i + 1, j - 1, true);
    const right = dfs(grid, i + 1, j + 1, false);
    return left + right;
  }

  if (grid[i][j] === ".") {
    if (grid[i - 1][j] === "|") {
      grid[i][j] = "|";
    }
    return dfs(grid, i + 1, j, comingFromLeft);
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
