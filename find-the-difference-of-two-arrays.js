/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
  const nums1Set = new Set(nums1);
  const nums2Set = new Set(nums2);

  const answer = [[], []];

  for (const num of nums1Set) {
    if (!nums2Set.has(num)) answer[0].push(num);
  }

  for (const num of nums2Set) {
    if (!nums1Set.has(num)) answer[1].push(num);
  }

  return answer;
};
