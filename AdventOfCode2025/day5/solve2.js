import {read} from "../file_reader.js";

function solve(lines) {
  const idRanges = extractIdRanges(lines)
      .map(toOrderedRange())
      .toSorted(byRange());

  return calculateFreshIds(idRanges);
}

function toOrderedRange() {
  return range => {
    const [from, to] = range;
    return [Math.min(from, to), Math.max(from, to)];
  };
}

function byRange() {
  return (a, b) => {
    const [fromA, toA] = a;
    const [fromB, toB] = b;

    if (fromA < fromB && toA < toB) return -1;
    if (fromA > fromB && toA > toB) return 1;

    if (fromA < fromB && toA > toB) return -1;
    if (fromA > fromB && toA < toB) return 1;

    if (fromA === fromB && toA < toB) return -1;
    if (fromA === fromB && toA > toB) return 1;

    if (fromA < fromB && toA === toB) return -1;
    if (fromA > fromB && toA === toB) return 1;

    if (fromA === fromB && toA === toB) return 0;
  };
}

function extractIdRanges(lines) {
  const idRanges = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      break;
    }

    const parsedIds = lines[i].split("-").map(id => Number.parseInt(id));
    idRanges.push(parsedIds);
  }
  return idRanges;
}

function calculateFreshIds(idRanges) {
  let freshIds = 0;

  for (let i = 0; i < idRanges.length; i++) {
    const [currFrom, currTo] = idRanges[i];

    let nextFrom, nextTo;
    if (idRanges[i + 1]) {
      [nextFrom, nextTo] = idRanges[i + 1];
    }

    if (!nextFrom || !nextTo) freshIds += currTo - currFrom + 1;

    if (currTo < nextFrom) {
      freshIds += currTo - currFrom + 1;
      continue;
    }

    if (currTo >= nextTo) {
      idRanges[i + 1] = [currFrom, currTo];
      continue;
    }

    if (currFrom >= nextFrom && currTo <= nextTo) {
      continue;
    }

    if (currFrom <= nextFrom && currTo <= nextTo) {
      idRanges[i + 1] = [currFrom, nextTo];
      continue;
    }
  }

  return freshIds;
}

read("./input.txt", solve);
// read("./example.txt", solve);
