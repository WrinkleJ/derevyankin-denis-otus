const openJSONFile = require("./openJSONFile");
const treeToString = require("./treeToString");

if (!process.argv[2]) {
  console.error("Error: Path to file didn't set.");
  return;
}

const tree = openJSONFile(process.argv[2]);

console.log(treeToString(tree));
