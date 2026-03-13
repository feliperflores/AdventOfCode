import {read} from "../file_reader.js";

function solve(lines) {
  let totalSum = 0;
  const parsedOperations = parseOperations(lines);

  for (let i = 0; i < parsedOperations[0].length; i++) {
    let currentOperationValue = 0;

    for (let j = 0; j < parsedOperations.length; j++) {
      if (j === parsedOperations.length - 1) continue;

      const currentOperation = parsedOperations[parsedOperations.length - 1][i];

      if (currentOperation === "*") {
        if (currentOperationValue === 0) currentOperationValue = 1;
        currentOperationValue *= parsedOperations[j][i];
      } else if (currentOperation === "+") {
        currentOperationValue += parsedOperations[j][i];
      }
    }

    totalSum += currentOperationValue;
  }

  return totalSum;
}

function parseOperations(lines) {
  const preparedOperations = [];

  for (let line of lines) {
    const preparedLine = line.split(" ").filter(x => x).map(x => {
      const value = Number.parseInt(x);

      if (!isNaN(value)) {
        return value;
      }

      return x;
    });
    preparedOperations.push(preparedLine);
  }
  return preparedOperations;
}

// read("./example.txt", solve);
read("./input.txt", solve);
