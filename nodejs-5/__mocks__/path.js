const jestPath = jest.genMockFromModule("path");

const sep = "/";

jestPath.basename = (name) => {
    const splittedName = name.split(sep);
    return splittedName[splittedName.length - 1];
};
jestPath.resolve = (name) => name;
jestPath.normalize = (name) => name;
jestPath.sep = sep;
jestPath.join = (base, name) => `${base}${sep}${name}`;

module.exports = jestPath;