import { expect } from "chai";
import getCalibration from "../sumOfAllCalibrations.js"

describe('sumOfAllCalibrations', () => {
  it('string starting with 1 and ending with 2 should return 12', () => {
    const values = ["gr1a2v245v22ffegf"];
    const result = getCalibration(values);
    expect(result).to.equal(12);
  })

  it('should return 90', () => {
    const values = ["gr1a2v245v22ffegf", "6g6r1a2v245v225f62fegf8"];
    const result = getCalibration(values);
    expect(result).to.equal(80);
  })

  it('only 4 in string should 44', () => {
    const values = ["4md"];
    const result = getCalibration(values);
    expect(result).to.equal(44);
  })

  it('should return 755', () => {
    const values = [
      "tmmnhlxzpj1eightldxhjnone97",
      "9fivekfpl855mjmfdqzvbn",
      "two29eighteight1",
      "4md",
      "sixbrqklb347",
      "6sevenninexpnbgbr11three15",
      "4zggkljkcqthree7",
      "7lxjkqhmxcxsevennhszsbxzdfsonehnsrcfour9",
      "jtpmfoureightvtjmlshbfour6nvjkqnddp3",
      "twofive2fourfive1dvnrrvjr",
      "twoeightnq6ninepxv",
      "39sixgphfvninexts71five",
      "seven3two8",
      "six59jhtfvv1five6",
      "7871three915"
    ];

    const result = getCalibration(values);
    expect(result).to.equal(17+95+21+44+37+65+47+79+63+21+66+31+38+56+75);
  })
})
