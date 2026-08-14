/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = function (target, nums) {
  let windowSize = 1;

  while (windowSize <= nums.length) {
    let windowSum = 0;

    for (let i = 0; i < windowSize; i++) {
      windowSum += nums[i];
    }

    if (windowSum >= target) {
      return windowSize;
    }

    let left = 0;
    let right = windowSize - 1;

    while (right < nums.length - 1) {
      windowSum -= nums[left];
      windowSum += nums[right + 1];

      if (windowSum >= target) {
        return windowSize;
      }

      left++;
      right++;
    }

    windowSize++;
  }

  return 0;
};
