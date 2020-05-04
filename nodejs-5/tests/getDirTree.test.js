const getDirTree = require("../../nodejs-2/src/getDirTree");

jest.mock("fs");
jest.mock("path");

test("work with empty directory", async () => {
  expect.assertions(1);
  const successResult = { name: "folder", items: [] };
  const testFsTree = { folder: {} };
  require("fs").__mockFsTree(testFsTree);
  const resTree = await getDirTree("folder");
  expect(resTree).toStrictEqual(successResult);
});

test("work with simple tree directory", async () => {
  expect.assertions(1);
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
  expect(resultTree).toStrictEqual(successResult);
});

test("return tree without directory destination", async () => {
  expect.assertions(1);
  
  const successResult = {
    name: "./",
    items: [{ name: "F" }, { name: "G" }],
  };

  const testFsTree = {
    "./": {
      F: "File content",
      G: "File content",
    },
  };

  require("fs").__mockFsTree(testFsTree);
  const resultTree = await getDirTree();
  expect(resultTree).toStrictEqual(successResult);
});

test("return tree with defined depth", async () => {
  expect.assertions(1);

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

  const successResult = {
    name: "A",
    items: [
      {
        name: "B",
        items: [],
      },
      { name: "F" },
      { name: "G" },
    ],
  };

  require("fs").__mockFsTree(testFsTree);
  const resultTree = await getDirTree("A", 1);
  expect(resultTree).toStrictEqual(successResult);
})

test("throw error, when max depth less than zero", async () => {
  expect.assertions(1);
  try {
    await getDirTree("A", -1)
  } catch (e) {
    expect(e.message).toMatch("Max depth must be over zero, but it is -1")
  }
})
