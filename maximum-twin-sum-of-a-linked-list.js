/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
  //   const values = [];

  //   let currentNode = head;

  //   while (currentNode) {
  //     values.push(currentNode.val);
  //     currentNode = currentNode.next;
  //   }

  //   let maxSum = 0;

  //   for (let i = 0; i < values.length / 2; i++) {
  //     const currentSum = values[i] + values[values.length - 1 - i];

  //     maxSum = Math.max(maxSum, currentSum);
  //   }

  //   return maxSum;

  // =================================================================================
  // O(1) Pamięciowo

  // 1. Znajdź środek
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. Odwróć drugą połowę (slow jest na początku drugiej połowy)
  let prev = null;
  let current = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  // prev to teraz głowa odwróconej drugiej połowy

  // 3. Iteruj obiema połówkami równolegle
  let maxSum = 0;
  let first = head;
  let second = prev;
  while (second) {
    maxSum = Math.max(maxSum, first.val + second.val);
    first = first.next;
    second = second.next;
  }

  return maxSum;

  // =================================================================================
};
