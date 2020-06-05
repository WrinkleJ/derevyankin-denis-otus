const jestPath = jest.genMockFromModule("path");
const normalizeSplittedPath = require("./normalizeSplittedPath");

const sep = "/";

jestPath.basename = (name) => {
  const splittedName = normalizeSplittedPath(name.split(sep));
  return splittedName[splittedName.length - 1];
};
jestPath.resolve = (name) => name;
jestPath.normalize = (name) => name;
jestPath.sep = sep;
jestPath.join = (base, name) => {
  const joinedPath = `${base}${sep}${name}`;
  return joinedPath;
};

module.exports = jestPath;
