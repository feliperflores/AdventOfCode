import {read} from "../file_reader.js";

function solve(lines) {
  const nodes = [];

  for (const line of lines) {
    const [x, y, z] = line.split(",");
    nodes.push(
      [
        Number.parseInt(x),
        Number.parseInt(y),
        Number.parseInt(z)
      ]
    );
  }

}

read("./example.txt", solve);
// read("./input.txt", solve);
