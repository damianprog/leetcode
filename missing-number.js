/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  //   nums.sort((a, b) => a - b);

  //   if (0 !== nums[0]) return 0;

  //   for (let i = 1; i < nums.length; i++) {
  //     const expectedNum = nums[i - 1] + 1;

  //     if (nums[i] !== expectedNum) return expectedNum;
  //   }

  //   return nums.length;

  // ============================================================

  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;

  for (const num of nums) {
    actualSum += num;
  }

  return expectedSum - actualSum;

  // ============================================================
};

const nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];

console.log(missingNumber(nums));
