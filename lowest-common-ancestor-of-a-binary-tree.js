/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  //   const paths = [];
  //   const dfs = (node, pathNodes) => {
  //     const currentPathNodes = [...pathNodes, node.val];
  //     if (node.val === p.val || node.val === q.val) {
  //       paths.push(currentPathNodes);
  //       if (paths.length === 2) {
  //         return;
  //       }
  //     }
  //     if (node.left) dfs(node.left, currentPathNodes);
  //     if (node.right) dfs(node.right, currentPathNodes);
  //   };
  //   dfs(root, []);
  //   let i = 0;
  //   let commonAncestor = paths[0][0];
  //   while (paths[0][i] === paths[1][i]) {
  //     commonAncestor = paths[0][i];
  //     i++;
  //   }
  //   return commonAncestor;
  // =================================================================================
  // Poprawiona wersja mojego podejścia
  //   const paths = [];
  //   const dfs = (node, path) => {
  //     if (!node || paths.length === 2) return;
  //     path.push(node);
  //     if (node === p || node === q) paths.push([...path]);
  //     dfs(node.left, path);
  //     dfs(node.right, path);
  //     path.pop();
  //   };
  //   dfs(root, []);
  //   let i = 0;
  //   while (
  //     i < paths[0].length &&
  //     i < paths[1].length &&
  //     paths[0][i] === paths[1][i]
  //   ) {
  //     i++;
  //   }
  //   return paths[0][i - 1];
  // =================================================================================
  // Rozwiązanie kanoniczne

  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;
  return left || right;

  // =================================================================================
};
