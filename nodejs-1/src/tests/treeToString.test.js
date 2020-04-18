const treeToString = require("../treeToString");
const otus_mock = require("./otus_mock.json");

const cases = [
  {
    title: "One node",
    tree: { name: 1 },
    result: "1\n",
  },
  {
    title: "Otus example",
    tree: otus_mock,
    result: "1\n├── 2\n│   └── 3\n│   └── 4\n└── 5\n    └── 6\n",
  },
];

cases.forEach(({ title, tree, result }) => {
  test(title, () => {
    expect(treeToString(tree)).toBe(result);
  });
});
