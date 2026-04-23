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
var reverseList = function (head) {
  // let prev = null;
  // let current = head;

  // while (current) {
  //   const next = current.next;
  //   current.next = prev;
  //   prev = current;
  //   current = next;
  // }
  // return prev;
  // ================================================================================
  // Rozwiązanie rekurencyjne

  // if (!head) return null;

  // let firstReversed = null;

  // const reverse = (node) => {
  //   if (!node.next) {
  //     firstReversed = node;
  //     return node;
  //   }

  //   const nextNode = reverse(node.next);

  //   nextNode.next = node;

  //   return node;
  // };

  // const lastReversed = reverse(head);
  // lastReversed.next = null;

  // return firstReversed;

  // ================================================================================
  // Kanoniczna wersja rozwiązania rekurencyjnego

  if (!head || !head.next) return head;

  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;

  // ================================================================================
};
