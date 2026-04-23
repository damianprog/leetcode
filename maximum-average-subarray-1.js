/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  //   let baseSum = 0;

  //   for (let i = 0; i < k; i++) {
  //     baseSum += nums[i];
  //   }

  //   let maxAverage = baseSum / k;

  //   for (let i = k; i < nums.length; i++) {
  //     baseSum += nums[i];
  //     baseSum -= nums[i - k];

  //     if (baseSum / k > maxAverage) maxAverage = baseSum / k;
  //   }

  //   return maxAverage;
  // ==============================================================================
  // Wersja wypolerowana
  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    if (windowSum > maxSum) maxSum = windowSum;
  }

  return maxSum / k;

  // ==============================================================================
};

// const nums = [1, 12, -5, -6, 50, 3];
const nums = [5];
const k = 1;

console.log(findMaxAverage(nums, k));
