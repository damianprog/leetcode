/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  //   const map = new Map();
  //   for (let i = 0; i < nums.length; i++) {
  //     if (map.has(nums[i])) {
  //       const numIndex = map.get(nums[i]);
  //       if (Math.abs(i - numIndex) <= k) {
  //         return true;
  //       } else {
  //         map.set(nums[i], i);
  //       }
  //     } else {
  //       map.set(nums[i], i);
  //     }
  //   }
  //   return false;
  // =============================================================
  // const map = new Map();
  //   for (let i = 0; i < nums.length; i++) {
  //     if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
  //       return true;
  //     }
  //     map.set(nums[i], i);
  //   }
  //   return false;
  // =============================================================

  // Sliding Window

  const window = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true;

    window.add(nums[i]);

    if (window.size > k) {
      window.delete(nums[i - k]);
    }
  }

  return false;
};
