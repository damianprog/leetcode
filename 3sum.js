/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  const triplets = [];
  for (let i = 0; i < nums.length; i++) {
    const target = -1 * nums[i];
    const numsIndexes = new Map();

    for (let j = i + 1; j < nums.length; j++) {
      const wanted = target - nums[j];

      if (numsIndexes.has(wanted)) {
        triplets.push([nums[i], nums[j], wanted]);
      } else {
        numsIndexes.set(nums[i], i);
      }
    }
  }

  return triplets;
};
