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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  const prefixCount = new Map();
  prefixCount.set(0, 1);
  let count = 0;

  function dfs(node, currSum) {
    if (!node) return;

    currSum += node.val;

    count += prefixCount.get(currSum - targetSum) ?? 0;

    prefixCount.set(currSum, (prefixCount.get(currSum) ?? 0) + 1);

    dfs(node.left, currSum);
    dfs(node.right, currSum);

    prefixCount.set(currSum, prefixCount.get(currSum) - 1);
  }

  dfs(root, 0);
  return count;

  // ==================================================================================
  // O(n2)

  // if (!root) return 0;

  // ile ścieżek zaczynających się DOKŁADNIE w tym węźle sumuje się do target
  // function fromNode(node, remaining) {
  //   if (!node) return 0;
  //   const hit = node.val === remaining ? 1 : 0;
  //   return (
  //     hit +
  //     fromNode(node.left, remaining - node.val) +
  //     fromNode(node.right, remaining - node.val)
  //   );
  // }

  // return (
  //   fromNode(root, targetSum) +
  //   pathSum(root.left, targetSum) +
  //   pathSum(root.right, targetSum)
  // );

  // ==================================================================================
};
