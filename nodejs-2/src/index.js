#!/usr/bin/env node
const printDirTree = require("./printDirTree");

const argv = require("yargs")
  .usage("$0 <path> [options]", "Print directory tree", (yargs) => {
    yargs.positional("path", {
      describe: "Absolute or relative directory path",
      type: "string",
    });
  })
  .option("depth", {
    alias: "d",
    describe: "Depth of directory tree to print",
    default: 10,
    type: "number"
  })
  .locale("en")
  .help().argv;

printDirTree(argv.path, argv.depth);
