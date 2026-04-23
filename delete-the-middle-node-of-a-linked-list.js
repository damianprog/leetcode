/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function (head) {
  //   let nodesCount = 0;
  //   let currentNode = head;

  //   while (currentNode) {
  //     nodesCount++;
  //     currentNode = currentNode.next;
  //   }

  //   if (nodesCount === 1) return null;

  //   const middleNodeIndex = Math.floor(nodesCount / 2);
  //   let currentNodeIndex = 0;

  //   currentNode = head;

  //   while (currentNodeIndex < middleNodeIndex) {
  //     if (currentNodeIndex === middleNodeIndex - 1) {
  //       currentNode.next = currentNode.next.next;
  //     }

  //     currentNode = currentNode.next;

  //     currentNodeIndex++;
  //   }

  //   return head;

  // ==============================================================================
  // Lepsza wersja w tym samym stylu

  //   if (!head || !head.next) return null;

  //   let count = 0;
  //   let current = head;

  //   while (current) {
  //     count++;
  //     current = current.next;
  //   }

  //   const middleIndex = Math.floor(count / 2);
  //   current = head;

  //   for (let i = 0; i < middleIndex - 1; i++) {
  //     current = current.next;
  //   }

  //   current.next = current.next.next;

  //   return head;

  // ==============================================================================
  // Najlepsze podejście slow/fast pointer

  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;
  let prev = null;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  prev.next = slow.next;

  return head;

  // ==============================================================================
};
