/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  if (nums.length === 1) return 0;

  let maxReach = 0;
  let jumps = 0;
  let range = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    maxReach = Math.max(maxReach, nums[i] + i);

    if (i === range) {
      range = maxReach;
      jumps++;

      if (range >= nums.length - 1) return jumps;
    }
  }

  return jumps;
};
