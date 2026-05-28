/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  //   let lastZeroIndex = null;

  //   for (let i = nums.length - 2; i >= 0; i--) {
  //     if (lastZeroIndex === null && nums[i] === 0) {
  //       lastZeroIndex = i;
  //     } else if (lastZeroIndex !== null && i + nums[i] > lastZeroIndex) {
  //       lastZeroIndex = null;
  //     }
  //   }

  //   return lastZeroIndex === null;
  // =================================================================================
  // Kanoniczna alternatywa

  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false; // nie da się tu dojść
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;

  // =================================================================================
};
