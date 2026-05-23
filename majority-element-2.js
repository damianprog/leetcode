/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
  let candidate1 = null;
  let candidate1Count = 0;

  let candidate2 = null;
  let candidate2Count = 0;

  for (const num of nums) {
    if (candidate1 === num) {
      candidate1Count++;
    } else if (candidate2 === num) {
      candidate2Count++;
    } else {
      if (candidate1Count === 0) {
        candidate1 = num;
        candidate1Count++;
      } else if (candidate2Count === 0) {
        candidate2 = num;
        candidate2Count++;
      } else {
        candidate1Count--;
        candidate2Count--;
      }
    }
  }

  let candidate1Occurrences = 0;
  let candidate2Occurrences = 0;

  for (const num of nums) {
    if (num === candidate1) {
      candidate1Occurrences++;
    } else if (num === candidate2) {
      candidate2Occurrences++;
    }
  }

  const result = [];
  const majority = Math.floor(nums.length / 3);

  if (candidate1Occurrences > majority) {
    result.push(candidate1);
  }

  if (candidate2Occurrences > majority) {
    result.push(candidate2);
  }

  return result;
};
