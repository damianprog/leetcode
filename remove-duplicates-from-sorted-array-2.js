/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  // if (nums.length <= 2) return nums.length;

  // let slow = 0;

  // for (let fast = 2; fast < nums.length; fast++) {
  //   if (nums[fast] !== nums[slow] || nums[fast] !== nums[slow + 1]) {
  //     slow += nums[slow + 1] === nums[slow] ? 2 : 1;
  //     nums[slow] = nums[fast];
  //   }
  // }

  // return slow + 1;

  if (nums.length <= 2) return nums.length;

  let slow = 2;

  for (let fast = 2; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow - 2]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
};
