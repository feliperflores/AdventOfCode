export default function getCalibration(lines) {
  return lines.reduce((sum, curr) => sum += Number(readLineValue(curr)), 0);
}

function readLineValue(line) {
  let foundI, foundJ;
  let i = 0;
  let j = line.length - 1;

  while (i <= j) {
    if (!isNaN(Number(line[i])) && !foundI) foundI = line[i];
    if (!isNaN(Number(line[j])) && !foundJ) foundJ = line[j];
    if (foundI && foundJ) return foundI + foundJ;

    if (foundI) j--;
    else if (foundJ) i++;
    else i++, j--;
  }
}
