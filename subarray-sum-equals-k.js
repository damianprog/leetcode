/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const prefixCount = new Map();

  prefixCount.set(0, 1);

  let total = 0;

  let currentPrefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    currentPrefixSum += nums[i];

    total += prefixCount.get(currentPrefixSum - k) ?? 0;

    prefixCount.set(
      currentPrefixSum,
      (prefixCount.get(currentPrefixSum) ?? 0) + 1,
    );
  }

  return total;
};
