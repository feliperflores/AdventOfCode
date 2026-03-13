import { readFile } from "fs";
import getCalibration from "./sumOfAllCalibrations.js";
import path from "path";

readFile(path.resolve("./day1/input.txt"), (err, data) => {
  const values = data.toString().split("\r\n");
  console.log(getCalibration(values));
});
