const getDirTree = require("./getDirTree");
const treeToString = require("../../nodejs-1/src/treeToString");

/**
 * Print directory tree with maximum path
 * @param {string} dirPath absolute or relative directory path
 * @param {number} maxDepth maximum depth to traverse directory tree
 */
function printDirTree(dirPath, maxDepth) {
  getDirTree(dirPath, maxDepth).then((tree) => console.log(treeToString(tree)));
}

module.exports = printDirTree;
