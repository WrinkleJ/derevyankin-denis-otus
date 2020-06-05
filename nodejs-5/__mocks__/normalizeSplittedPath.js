function isCurrentDirectory(splittedName) {
    return splittedName[0] === "." && splittedName[1] === "";
  }

function normalizeSplittedPath(splittedPath) {
    return isCurrentDirectory(splittedPath)
    ? ["./", ...splittedPath.slice(2)]
    : splittedPath;
}

module.exports = normalizeSplittedPath;