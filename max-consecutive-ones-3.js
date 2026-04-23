/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  // let flipsLeft = k;
  // let currentLength = 0;
  // let maxLength = 0;
  // let flipIndexes = [];

  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] === 1 || flipsLeft > 0) {
  //     currentLength++;

  //     if (nums[i] === 0) {
  //       flipIndexes.push(i);
  //       flipsLeft--;
  //     }
  //   } else {
  //     maxLength = Math.max(currentLength, maxLength);
  //     const firstFlip = flipIndexes.shift();
  //     if (firstFlip || firstFlip === 0) {
  //       currentLength = i - firstFlip;
  //       flipIndexes.push(i);
  //     } else {
  //       currentLength = 0;
  //     }
  //   }
  // }

  // return Math.max(currentLength, maxLength);

  // =======================================================================
  // Lepsze rozwiązanie

  let left = 0;
  let zeros = 0;
  let maxLength = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;

    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;

  // =======================================================================
};
