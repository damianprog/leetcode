/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  let smallest = nums[0];
  let secondSmallest = Infinity;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= smallest) {
      smallest = nums[i];
    } else if (nums[i] <= secondSmallest) {
      secondSmallest = nums[i];
    } else {
      return true;
    }
  }

  return false;
};
