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
var oddEvenList = function (head) {
  // if (!head || !head.next) return head;

  // const firstEvenNode = head.next;
  // let oddNode = head;
  // let evenNode = head.next;
  // let lastOddNode = oddNode;

  // while ((oddNode && oddNode.next) || (evenNode && evenNode.next)) {
  //   if (oddNode && oddNode.next) {
  //     oddNode.next = oddNode.next.next;
  //     oddNode = oddNode.next;
  //     if (oddNode) lastOddNode = oddNode;
  //   }

  //   if (evenNode && evenNode.next) {
  //     evenNode.next = evenNode.next.next;
  //     evenNode = evenNode.next;
  //   }
  // }

  // lastOddNode.next = firstEvenNode;

  // return head;
  // ===========================================================================
  // Zrefaktoryzowana wersja

  if (!head || !head.next) return head;

  let odd = head;
  let even = head.next;
  const evenHead = even;

  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }

  odd.next = evenHead;
  return head;

  // ===========================================================================
};
