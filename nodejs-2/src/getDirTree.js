const fs = require("fs");
const path = require("path");
const getFullPath = require("../../nodejs-1/src/getFullPath");

const MAX_TRAVERSE_DEPTH = 10;

/**
 * @typedef Tree
 * @type {object}
 * @property {string} name - node's title.
 * @property {Array.<Tree>} items - child nodes
 */

/**
 * Traverses directory tree and
 * return object which describes it
 * @param {string} dirPath absolute or relative directory path
 * @param {number} maxDepth maximum depth to traverse directory tree
 * @returns {Tree} object which describes directory tree
 */
async function getDirTree(dirPath = "./", maxDepth = MAX_TRAVERSE_DEPTH) {
  const fullPath = getFullPath(dirPath);
  return dive(fullPath, maxDepth, 0);
}

async function dive(dirPath, maxDepth, currentDepth) {
  const baseName = path.basename(dirPath);
  const node = { name: baseName, items: [] };
  if (currentDepth < maxDepth) {
    const dir = await fs.promises.opendir(dirPath);
    for await (const dirent of dir) {
      if (dirent.isFile()) {
        node.items.push({ name: dirent.name });
      } else {
        const subNode = await dive(
          path.join(dirPath, dirent.name),
          maxDepth,
          currentDepth + 1
        );
        node.items.unshift(subNode);
      }
    }
  }
  return node;
}

module.exports = getDirTree;
