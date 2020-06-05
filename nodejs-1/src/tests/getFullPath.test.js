const getFullPath = require("../getFullPath");
const path = require("path");

const testPath = "./DirectoryMock";

test("return absolute path from relative", () => {
  const resultPath = getFullPath(testPath);
  const fullPath = path.resolve(testPath);
  expect(resultPath).toBe(fullPath);
});

test("return absolute path from absolute path", () => {
  const fullPath = path.resolve(testPath);
  const resultPath = getFullPath(fullPath);
  expect(resultPath).toBe(fullPath);
});
