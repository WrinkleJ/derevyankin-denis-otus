const path = require("path");

/**
 * Return valid full path by some path
 * @param {string} userPath some path from file system
 * @returns {string} valid full path
 */
function getFullPath(userPath) {
  const normalizedPath = path.normalize(userPath);
  return path.isAbsolute(normalizedPath)
    ? normalizedPath
    : path.resolve(normalizedPath);
}

module.exports = getFullPath;
