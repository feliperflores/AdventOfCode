import {read} from "../file_reader.js";

function solve2(lines) {
  let dialPosition = 50;
  let fullRotations = 0;

  for (const action of lines) {
    const leftOrRight = action[0];
    const rotation = Number.parseInt(action.slice(1));
    const fixedRotation = Number.parseInt(action.slice(1)) % 100;
    const passedOverZeroTimes = Math.floor(rotation / 100);

    fullRotations += passedOverZeroTimes;

    if (fixedRotation === 0) {
      continue;
    }

    if (leftOrRight === "L") {
      [dialPosition, fullRotations] = calculateLeft(dialPosition, fixedRotation, fullRotations);
    } else {
      [dialPosition, fullRotations] = calculateRight(dialPosition, fixedRotation, fullRotations);
    }

  }

  return fullRotations;
}

function calculateLeft(dialPosition, fixedRotation, fullRotations) {
  const newPosition = dialPosition - fixedRotation;

  if (newPosition < 0) {
    if (dialPosition !== 0) {
      fullRotations++;
    }

    dialPosition = 100 - Math.abs(newPosition);
  } else {
    if (newPosition === 0) {
      fullRotations++;
    }

    dialPosition = newPosition;
  }

  return [dialPosition, fullRotations];
}

function calculateRight(dialPosition, fixedRotation, fullRotations) {
  const newPosition = dialPosition + fixedRotation;

  if (newPosition >= 100) {
    if (dialPosition !== 0) {
      fullRotations++;
    }

    dialPosition = newPosition - 100;
  } else {
    if (newPosition === 0) {
      fullRotations++;
    }

    dialPosition = newPosition;
  }

  return [dialPosition, fullRotations];
}

read("./input.txt", solve2);
