import {read} from "../file_reader.js";

function solve(lines) {
  let dialPosition = 50;
  let timesAtZero = 0;

  for (const action of lines) {
    const leftOrRight = action[0];
    const rotation = Number.parseInt(action.slice(1)) % 100;

    if (leftOrRight === "L") {

      const newPosition = dialPosition - rotation;

      if (newPosition < 0) {
        dialPosition = 100 - Math.abs(newPosition);
      } else {
        dialPosition = newPosition;
      }
    } else {
      const newPosition = dialPosition + rotation;

      if (newPosition >= 100) {
        dialPosition =  newPosition - 100;
      } else {
        dialPosition = newPosition;
      }
    }

    if (dialPosition === 0) {
      timesAtZero++;
    }
  }

  return timesAtZero;
}

read("./input.txt", solve);
