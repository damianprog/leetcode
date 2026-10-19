/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
  const numToSequenceLength = new Map();

  let longestSequence = 0;

  for (const num of nums) {
    const prevNumSequenceLength = numToSequenceLength.get(num - 1);
    if (prevNumSequenceLength) {
      numToSequenceLength.delete(num - 1);
      if (prevNumSequenceLength + 1 > longestSequence) {
        longestSequence = prevNumSequenceLength + 1;
      }
      numToSequenceLength.set(num, prevNumSequenceLength + 1);
    }
  }

  return longestSequence;
};

const nums = [100, 4, 200, 1, 3, 2];

console.log(longestConsecutive(nums));
