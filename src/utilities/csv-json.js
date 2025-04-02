import fs from "node:fs";
import readline from "node:readline";

function csvToJson(csvPath, jsonName) {
  const myInterface = readline.createInterface({
    input: fs.createReadStream(
      `/Users/bertieraffle/Documents/projects/company/postcode-checker/src/assets/${csvPath}`
    ),
  });
  //Opens a read stream for csv file and reads it line by line

  const log = fs.createWriteStream(jsonName, { flags: "a" });
  //Creates a write stream for appending new lines to jsonName

  let lineno = 0;
  let keys = [];

  myInterface.on("line", (line) => {
    if (lineno === 0) {
      //gets the column names as an array
      keys = line.split(",");
    } else {
      let values = line.split(",");
      let objectLine = values.reduce((currentTotal, newValue, i) => {
        if (keys[i] === "pcd" || keys[i].includes("laua")) {
          //matches the necessary columns to their respective values and adds them to output
          return { ...currentTotal, [keys[i]]: newValue.replaceAll(/"/g, "") }; //removes extra "s from the value
        } else {
          return { ...currentTotal };
        }
      }, {});
      log.write(JSON.stringify(objectLine) + ",\n"); //writes the newline as json with a comma and newline afterwards
    }
    lineno++;
  });
}
//* Runs on the sperate files that are listed in filenames.txt
// let myInterface = readline.createInterface({
//   input: fs.createReadStream(`filenames.txt`),
// });
// myInterface.on("line", (line) => {
//   csvToJson(`multi_csv${line}`, "colatted-postcodes.json");
// });

//* Runs on the combined file
csvToJson("NSPL_FEB_2025_UK.csv", "postcodes.json");
