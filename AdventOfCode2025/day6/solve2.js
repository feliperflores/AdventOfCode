import {read} from "../file_reader.js";

function solve(lines) {
  const operations = buildOperations(lines);
  let lineSum = [];
  let operationIndex = 0;
  let totalSum = 0;

  for (let i = 0; i < lines[0].length; i++) {
    if (i === lines[0].length - 1) {
      let currNumber = calculateCurrentNumber(lines, i);
      lineSum.push(currNumber);

      const currCalculation = calculateTotalAmount(lineSum, operations[operationIndex++]);
      totalSum += currCalculation;
      break;
    }

    if (isNextNumber(lines, i)) {
      const currCalculation = calculateTotalAmount(lineSum, operations[operationIndex++]);

      totalSum += currCalculation;
      lineSum = [];

      continue;
    }

    let currNumber = calculateCurrentNumber(lines, i);

    lineSum.push(currNumber);
  }

  return totalSum;
}

function buildOperations(lines) {
  return lines[lines.length - 1].split(" ").filter(x => x);
}

function isNextNumber(lines, i) {
  let isNextNumber = true;

  for (let j = 0; j < lines.length - 1; j++) {
    if (lines[j][i] !== " ") isNextNumber = false;
  }

  return isNextNumber;
}

function calculateTotalAmount(lineSum, currOperation) {
  const isSum = currOperation === "+";

  return lineSum.reduce((acc, curr) => {
    if (isSum) {
      acc += Number.parseInt(curr);
    } else {
      acc *= Number.parseInt(curr);
    }

    return acc;
  }, isSum ? 0 : 1);
}

function calculateCurrentNumber(lines, i) {
  let currNumber = "";

  for (let j = 0; j < lines.length - 1; j++) {
    currNumber += lines[j][i] !== " " ? lines[j][i] : "";
  }

  return currNumber;
}

// read("./example.txt", solve);
read("./input.txt", solve);
