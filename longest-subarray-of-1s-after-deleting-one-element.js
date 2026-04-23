/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  //   let hasZero = false;
  //   let left = 0;
  //   let maxLength = 0;

  //   for (let right = 0; right < nums.length; right++) {
  //     if (nums[right] === 0 && hasZero) {
  //       let isLeftPastZero = false;

  //       while (!isLeftPastZero) {
  //         if (nums[left] === 0) isLeftPastZero = true;
  //         left++;
  //       }
  //     }

  //     if (nums[right] === 0) hasZero = true;

  //     maxLength = Math.max(maxLength, right - left);
  //   }

  //   return maxLength;

  // =================================================================================

  let left = 0;
  let zeroCount = 0;
  let maxLength = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeroCount++;
    }

    while (zeroCount > 1) {
      if (nums[left] === 0) {
        zeroCount--;
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left);
  }

  return maxLength;

  // =================================================================================
};
