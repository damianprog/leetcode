/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
  if (nums.length === 0) return 0;

  const uniqueNums = new Set(nums);
  let longestSequence = 1;

  for (const num of uniqueNums) {
    if (!uniqueNums.has(num - 1)) {
      let currentNum = num;
      while (uniqueNums.has(currentNum + 1)) {
        currentNum++;
      }
      longestSequence = Math.max(longestSequence, currentNum - num + 1);
    }
  }

  return longestSequence;
};

const nums = [100, 4, 200, 1, 3, 2];

console.log(longestConsecutive(nums));
