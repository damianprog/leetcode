/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  //   const dummy = { next: head };
  //   let slow = dummy;
  //   let fast = head;

  //   for (let i = 0; i < n - 1; i++) {
  //     fast = fast.next;
  //   }

  //   while (fast && fast.next) {
  //     slow = slow.next;
  //     fast = fast.next;
  //   }

  //   slow.next = slow.next.next;

  //   return dummy.next;

  // ==========================================================================
  // Czystszy idiom: Niech for loop sam załatwi całą różnicę n
  const dummy = { next: head };
  let slow = dummy;
  let fast = dummy; // oba startują na dummy

  for (let i = 0; i < n; i++) {
    fast = fast.next; // fast wyprzedza slow o n
  }

  while (fast.next) {
    // czekamy aż fast trafi na ostatni
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
  // ==========================================================================
};
