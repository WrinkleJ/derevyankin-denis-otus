const getDirTree = require("../../nodejs-2/src/getDirTree");

jest.mock("fs");
jest.mock("path");

test("work with empty directory", async () => {
  expect.assertions(1);
  const successResult = { name: "folder", items: [] };
  const testFsTree = { folder: {} };
  require("fs").__mockFsTree(testFsTree);
  const resTree = await getDirTree("folder");
  expect(resTree).toMatchObject(successResult);
});

test("work with simple tree directory", async () => {
  const successResult = {
    name: "A",
    items: [
      {
        name: "B",
        items: [{ name: "C", items: [{ name: "D" }, { name: "E" }] }],
      },
      { name: "F" },
      { name: "G" },
    ],
  };

  const testFsTree = {
    A: {
      B: {
        C: {
          D: "File content",
          E: "File content",
        },
      },
      F: "File content",
      G: "File content",
    },
  };

  require("fs").__mockFsTree(testFsTree);
  const resultTree = await getDirTree("A");
  expect(resultTree).toMatchObject(successResult);
});
