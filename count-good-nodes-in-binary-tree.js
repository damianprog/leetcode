/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function (root) {
  // let count = 0;

  // const dfs = (node, pathGreatestVal) => {
  //   if (!node) {
  //     return;
  //   }

  //   if (pathGreatestVal <= node.val) {
  //     count++;
  //   }

  //   const currentGreatestVal = Math.max(pathGreatestVal, node.val);

  //   if (node.left) dfs(node.left, currentGreatestVal);
  //   if (node.right) dfs(node.right, currentGreatestVal);
  // };

  // dfs(root, -Infinity);

  // return count;
  // =============================================================================
  // Zwracanie wartości zamiast closure'a

  // const dfs = (node, maxSoFar) => {
  //   if (!node) return 0;
  //   const isGood = node.val >= maxSoFar ? 1 : 0;
  //   const newMax = Math.max(maxSoFar, node.val);
  //   return isGood + dfs(node.left, newMax) + dfs(node.right, newMax);
  // };
  // return dfs(root, -Infinity);

  // =============================================================================
  // Wersja iteracyjna

  if (!root) return 0;
  let count = 0;
  const stack = [[root, -Infinity]];
  while (stack.length) {
    const [node, maxSoFar] = stack.pop();
    if (node.val >= maxSoFar) count++;
    const newMax = Math.max(maxSoFar, node.val);
    if (node.right) stack.push([node.right, newMax]);
    if (node.left) stack.push([node.left, newMax]);
  }
  return count;

  // =============================================================================
};
