/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  // const originalNums = [...nums];

  // for (let i = 0; i < originalNums.length; i++) {
  //   const destination = (i + k) % nums.length;
  //   nums[destination] = originalNums[i];
  // }

  for (let i = 0; i < nums.length; i++) {
    const destination = (i + k) % nums.length;

    const prevDestinationValue = nums[destination];
    nums[destination] = nums[i];

    const destinationOfDestination = (destination + k) % nums.length;
    nums[destinationOfDestination] = prevDestinationValue;
  }
};
