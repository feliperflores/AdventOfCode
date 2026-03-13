import {read} from "../file_reader.js";

function solve(lines) {
  const input = lines[0];
  const ranges = input.split(",");
  const invalidIds = new Set();

  for (const range of ranges) {
    const [from, to] = range.split("-");

    for (let i = Number.parseInt(from); i <= Number.parseInt(to); i++) {
      if (isInvalidId(i.toString())) {
        invalidIds.add(i);
      }
    }
  }

  let total = 0;

  invalidIds.forEach(id => total += id);

  return total;
}

function isInvalidId(id) {
  let left = 0;
  let mid = Math.floor(id.length / 2);

  if (id.length % 2 !== 0) return false;

  while (mid < id.length) {
    if (id[left] !== id[mid]) {
      return false;
    }
    left++;
    mid++;
  }

  return true;
}

read("./input.txt", solve);
