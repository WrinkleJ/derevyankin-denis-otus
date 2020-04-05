const fs = require("fs");
const path = require("path");

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

function getFullPath(userPath) {
  const normalizedPath = path.normalize(userPath);
  return path.isAbsolute(normalizedPath)
    ? normalizedPath
    : path.resolve(normalizedPath);
}

module.exports = openJSONFile;
