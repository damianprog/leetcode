/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  const triplets = [];
  for (let i = 0; i < nums.length; i++) {
    const target = -1 * nums[i];
    const numsIndexes = new Set();

    for (let j = i + 1; j < nums.length; j++) {
      const wanted = target - nums[j];

      if (numsIndexes.has(wanted)) {
        triplets.push([nums[i], nums[j], wanted]);
      } else {
        numsIndexes.add(nums[j]);
      }
    }
  }

  return triplets;
};

// const nums = [-1, 0, 1, 2, -1, -4];
const nums = [-1, 0, 1, -1, 0, 1];

console.log(threeSum(nums));
