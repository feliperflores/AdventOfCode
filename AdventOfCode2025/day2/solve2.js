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
  if (id.length === 1) return false;

  let right = 0;
  let mid = Math.floor(id.length / 2);

  if (id.length % 2 !== 0) mid++;

  while (right < mid) {
    const currentSize = right + 1;
    const current = id.slice(0, currentSize);
    let everyRangeValid = true;

    for (let i = currentSize; i < id.length; i += currentSize) {
      const test = id.slice(i, i + currentSize);
      const isInvalid = current !== test;

      if (isInvalid) {
        everyRangeValid = false;
        break;
      }
    }

    if (everyRangeValid) {
      return true;
    }

    right++;
  }

  return false;
}

// read("./test.txt", solve);
// read("./example.txt", solve);
read("./input.txt", solve);
