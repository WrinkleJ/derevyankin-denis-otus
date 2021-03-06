/**
 * @typedef Tree
 * @type {object}
 * @property {string} name - node's title.
 * @property {Array.<Tree>} items - child nodes
 */

/**
 * Convert tree object to string
 * @param {Tree} tree object to convert
 * @returns {string} tree string representation
 */
function treeToString(tree) {
  return dive(tree.name, tree.items);
}

function dive(name, _items, lastChildMarks = []) {
  const root = `${name}\n`;
  const space = lastChildMarks
    .map((isLastBranch) => (isLastBranch ? `    ` : `│   `))
    .join(``);
  const items = _items || [];
  return items.reduce((treeStr, child, i) => {
    const childItems = child.items || [];
    const isLastChild = i === items.length - 1;
    const isLeaf = childItems.length === 0;
    const jointer = isLastChild || isLeaf ? `└──` : `├──`;
    const updatedLastChildMarks = [...lastChildMarks, isLastChild];
    const subTree = dive(child.name, childItems, updatedLastChildMarks);
    return `${treeStr}${space}${jointer} ${subTree}`;
  }, root);
}

module.exports = treeToString;
