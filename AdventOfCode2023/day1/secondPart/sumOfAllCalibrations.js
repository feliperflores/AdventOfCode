export default function getCalibration(lines) {
  return lines.reduce((sum, curr) => (sum += Number(readLineValue(curr))), 0);
}

const WRITTEN_NUMBERS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const WRITTEN_NUMBERS_KEYS = Object.keys(WRITTEN_NUMBERS);

function readLineValue(line) {
  let foundI, foundJ;
  let wordIStart = 0;
  let wordIEnd = wordIStart + 3;
  let wordJStart = line.length;
  let wordJEnd = wordJStart - 3;

  while (i <= j) {
    const wordI = line.splice(wordIStart, wordIEnd);
    const wordIisWritten = isWrittenNumber(wordI);
    if (wordIisWritten && WRITTEN_NUMBERS[wordI] && !foundI) {
      foundI = line[i];
    } else if (wordIisWritten && !WRITTEN_NUMBERS[wordI] && !foundI) {
      wordIEnd++;
      continue;
    } else if (isNumber(line[i]) && !foundI) {
      foundI = line[i];
    } else if (!isNumber(line[i]) && !wordIisWritten) {
      i++;
      wordIStart = i;
      wordIEnd = wordIStart + 3;
    }
  }
}

// function readLineValue(line) {
//   let foundI, foundJ;
//   let i = 0;
//   let j = line.length - 1;

//   while (i <= j) {
//     if (isNumber(line[i]) && !foundI) foundI = line[i];
//     if (isNumber(line[j]) && !foundJ) foundJ = line[j];
//     if (foundI && foundJ) return foundI + foundJ;

//     if (foundI) j--;
//     else if (foundJ) i++;
//     else i++, j--;
//   }
// }

function isNumber(character) {
  return !isNaN(Number(character));
}

function isWrittenNumber(word) {
  return WRITTEN_NUMBERS_KEYS.some((writtenNumber) =>
    writtenNumber.includes(word)
  );
}
