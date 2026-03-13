import {read} from "../file_reader.js";

function solve(lines) {
    const grid = [];

    for (const line of lines) {
        grid.push(line.split(""));
    }

    let counter = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "@" && count(grid, i, j) < 4) {
                counter++;
            }
        }
    }

    return counter;
}

function count(grid, i, j) {
    let count = 0;

    if (grid[i + 1]?.[j] === "@") count++;
    if (grid[i][j + 1] === "@") count++;
    if (grid[i - 1]?.[j] === "@") count++;
    if (grid[i][j - 1] === "@") count++;
    if (grid[i + 1]?.[j + 1] === "@") count++;
    if (grid[i - 1]?.[j - 1] === "@") count++;
    if (grid[i + 1]?.[j - 1] === "@") count++;
    if (grid[i - 1]?.[j + 1] === "@") count++;

    return count;
}

// read("./example.txt", solve);
read("./input.txt", solve);
