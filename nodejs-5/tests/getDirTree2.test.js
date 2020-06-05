const getDirTree = require("../../nodejs-2/src/getDirTree");

test("throw error when define nonexistent file or directory", async () => {
  expect.assertions(1);
  try {
    await getDirTree("./empty/A");
  } catch (e) {
    expect(e.message).toMatch("No such file or directory");
  }
});
