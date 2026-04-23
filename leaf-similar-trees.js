/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  //   const values1 = [];
  //   const values2 = [];

  //   const dfs = (node, values) => {
  //     if (!node.left && !node.right) {
  //       values.push(node.val);
  //       return;
  //     }

  //     if (node.left) dfs(node.left, values);
  //     if (node.right) dfs(node.right, values);
  //   };

  //   dfs(root1, values1);
  //   dfs(root2, values2);

  //   if (values1.length !== values2.length) {
  //     return false;
  //   }

  //   for (let i = 0; i < values1.length; i++) {
  //     if (values1[i] !== values2[i]) return false;
  //   }

  //   return true;

  // ===================================================================================
  // Wersja z generatorami. Wychodzimy z funkcji wtedy kiedy pojawi się różnica pomiędzy leaves.

  function* leaves(node) {
    if (!node.left && !node.right) {
      yield node.val;
      return;
    }
    if (node.left) yield* leaves(node.left);
    if (node.right) yield* leaves(node.right);
  }

  var leafSimilar = function (root1, root2) {
    const it1 = leaves(root1);
    const it2 = leaves(root2);

    while (true) {
      const a = it1.next();
      const b = it2.next();
      if (a.done && b.done) return true;
      if (a.done || b.done) return false;
      if (a.value !== b.value) return false;
    }
  };

  // ===================================================================================
};
