/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  const triplets = [];

  const tripletsStrings = new Set();

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    const target = -1 * nums[i];
    const numsSpotted = new Set();

    for (let j = i + 1; j < nums.length; j++) {
      const wanted = target - nums[j];

      if (numsSpotted.has(wanted)) {
        const tripletString = `${nums[i]}${nums[j]}${wanted}`;

        if (!tripletsStrings.has(tripletString)) {
          triplets.push([nums[i], nums[j], wanted]);
          tripletsStrings.add(`${nums[i]}${nums[j]}${wanted}`);
        }
      } else {
        numsSpotted.add(nums[j]);
      }
    }
  }

  return triplets;
};

// const nums = [-1, 0, 1, 2, -1, -4];
const nums = [-1, 0, 1, -1, 0, 1];

console.log(threeSum(nums));
