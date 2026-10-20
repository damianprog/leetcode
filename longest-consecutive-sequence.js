/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
  // const numToHigher = new Map();

  // for (const num of nums) {
  //   if (numToHigher.has(num - 1)) {
  //     numToHigher.set(num - 1, num);
  //   }

  //   if (numToHigher.has(num + 1)) {
  //     numToHigher.set(num, num + 1);
  //   } else {
  //     numToHigher.set(num, null);
  //   }
  // }

  const uniqueNums = new Set(nums);
  let count = 0;

  for (const num of nums) {
    if (uniqueNums.has(num + 1)) {
      count++;
    }
  }

  return count + 1;
};

const nums = [100, 4, 200, 1, 3, 2];

longestConsecutive(nums);
