/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = function (target, nums) {
  // let windowSize = 1;
  // while (windowSize <= nums.length) {
  //   let windowSum = 0;
  //   for (let i = 0; i < windowSize; i++) {
  //     windowSum += nums[i];
  //   }
  //   if (windowSum >= target) {
  //     return windowSize;
  //   }
  //   let left = 0;
  //   let right = windowSize - 1;
  //   while (right < nums.length - 1) {
  //     windowSum -= nums[left];
  //     windowSum += nums[right + 1];
  //     if (windowSum >= target) {
  //       return windowSize;
  //     }
  //     left++;
  //     right++;
  //   }
  //   windowSize++;
  // }
  // return 0;

  // ================================================================================
  // O(n)

  // for (let i = 0; i < nums.length; i++) {
  //   sum += nums[i];

  //   if (sum < target) {
  //     continue;
  //   }
  // }
  let sum = 0;
  let left = 0;
  let right = 0;

  let minimumWindowSize = Infinity;

  while (right < nums.length) {
    sum += nums[right];

    while (sum >= target) {
      const currentWindowSize = right - left + 1;

      minimumWindowSize = Math.min(currentWindowSize, minimumWindowSize);

      sum -= nums[left];

      left++;
    }

    right++;
  }

  return minimumWindowSize !== Infinity ? minimumWindowSize : 0;

  // ================================================================================
};

const target = 7;
const nums = [2, 3, 1, 2, 4, 3];

console.log(minSubArrayLen(target, nums));
