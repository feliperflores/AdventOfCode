import {read} from "../file_reader.js";

function solve(lines) {
  const idRanges = [];
  let startAvailableIdsFrom;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      startAvailableIdsFrom = i + 1;
      break;
    }

    const parsedIds = lines[i].split("-").map(id => Number.parseInt(id));
    idRanges.push(parsedIds);
  }

  const availableIds = new Set();

  for (let i = startAvailableIdsFrom; i < lines.length; i++) {
    availableIds.add(Number.parseInt(lines[i]));
  }

  let freshIds = 0;

  for (const id of availableIds) {
    for (const [from, to] of idRanges) {
      if (from <= id && id <= to) {
        freshIds++;
        availableIds.delete(id);
        break;
      }
    }
  }

  return freshIds;
}

// read("./example.txt", solve);
read("./input.txt", solve);
