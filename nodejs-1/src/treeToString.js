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

function dive(name, _items, depth = 0, isLastBranch = false) {
  const root = `${name}\n`;
  const space = new Array(depth).fill(isLastBranch ? `    ` : `│   `).join(``);
  const items = _items || [];
  return items.reduce((treeStr, child, i) => {
    const childItems = child.items || [];
    const isLastChild = i === items.length - 1;
    const isLeaf = childItems.length === 0;
    const jointer = isLastChild || isLeaf ? `└──` : `├──`;
    return `${treeStr}${space}${jointer} ${dive(
      child.name,
      childItems,
      depth + 1,
      isLastBranch || isLastChild
    )}`;
  }, root);
}

module.exports = treeToString;
