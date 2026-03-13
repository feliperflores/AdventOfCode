import { readFile } from "fs";
import path from "path";

export function read(filePath, callBack) {
  return readFile(path.resolve(filePath), (err, data) => {
    const lines = data.toString().split("\n");
    const value = callBack(lines);
    console.log(value);
    return value;
  });
}