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
var longestZigZag = function (root) {
  // let currentLength = 0;
  // let maxLength = 0;

  // const dfs = (node, prevDirection) => {
  //   if (!node) {
  //     return;
  //   }

  //   currentLength++;
  //   maxLength = Math.max(currentLength, maxLength);

  //   if (prevDirection === "left") {
  //     dfs(node.right, "right");
  //   } else {
  //     dfs(node.left, "left");
  //   }

  //   currentLength = 1;

  //   dfs(node[prevDirection], prevDirection);
  // };

  // dfs(root, "left");

  // return maxLength - 1;

  let ans = 0;

  // zwraca [goLeft, goRight] — długości zigzagów zaczynających się
  // w node idących w lewo / w prawo (liczone w krawędziach)
  const dfs = (node) => {
    if (!node) return [-1, -1];

    const [, fromLeftGoingRight] = dfs(node.left);
    const [fromRightGoingLeft] = dfs(node.right);

    const goLeft = fromLeftGoingRight + 1; // w lewo, potem kontynuuj w prawo z dziecka
    const goRight = fromRightGoingLeft + 1; // w prawo, potem w lewo z dziecka

    ans = Math.max(ans, goLeft, goRight);
    return [goLeft, goRight];
  };

  dfs(root);
  return ans;
};
