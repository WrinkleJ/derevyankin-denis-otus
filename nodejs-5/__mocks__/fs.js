const fs = jest.genMockFromModule("fs");
const path = require("path");
const normalizeSplittedPath = require("./normalizeSplittedPath");

let tree = {};

function __mockFsTree(directoryTree) {
  tree = directoryTree;
}

function getObjectsFromPath(dirPath) {
  const subTree = getSubTree(dirPath);
  return Object.keys(subTree).map((key) => ({
    isFile: () => typeof subTree[key] === "string",
    name: key,
  }));
}

function getSubTree(dirPath) {
  const __path = normalizeSplittedPath(dirPath.split(path.sep));
  return __path.reduce((curSubTree, name) => curSubTree[name] || {}, tree);
}

function getAsyncIterator(dirPath) {
  const objectsFromPath = getObjectsFromPath(dirPath);
  return {
    [Symbol.asyncIterator]() {
      return {
        currentIndex: 0,
        async next() {
          if (this.currentIndex < objectsFromPath.length) {
            const fsObject = objectsFromPath[this.currentIndex];
            this.currentIndex++;
            return {
              done: false,
              value: fsObject,
            };
          } else {
            return { done: true };
          }
        },
      };
    },
  };
}

async function opendir(dirPath) {
  return new Promise((resolve) => {
    const iterator = getAsyncIterator(dirPath);
    resolve(iterator);
  });
}

async function access() {
  return new Promise((resolve) => resolve(true));
}

fs.__mockFsTree = __mockFsTree;
fs.promises = {
  opendir: opendir,
  access: access
};
module.exports = fs;
