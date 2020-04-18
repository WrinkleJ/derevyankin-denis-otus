const fs = require("fs");
const getFullPath = require("./getFullPath");

/**
 * Read json file by path and
 * return json object from file
 * @param {string} path path to file
 * @returns json object
 */
function openJSONFile(path) {
  const fullPath = getFullPath(path);
  const json = fs.readFileSync(fullPath, { encoding: "utf-8" });
  return JSON.parse(json);
}

module.exports = openJSONFile;
