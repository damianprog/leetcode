/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // let slow = 0;
  // let fast = 1;

  // while (fast < nums.length) {
  //   if (nums[fast] !== 0 && nums[slow] === 0) {
  //     nums[slow] = nums[fast];
  //     nums[fast] = 0;
  //     slow++;
  //   }

  //   if (nums[slow] !== 0) slow++;
  //   fast++;
  // }

  // =========================================================

  // let slow = 0;

  // for (let fast = 0; fast < nums.length; fast++) {
  //   if (nums[fast] !== 0) {
  //     [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
  //     slow++;
  //   }
  // }

  // =========================================================

  // Wersja najbardziej oczywista
  // Najpierw zbierasz wszystkie niezera na początek
  // Potem resztę wypełniasz zerami

  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  while (slow < nums.length) {
    nums[slow] = 0;
    slow++;
  }
};

// const nums = [0, 1, 0, 3, 12];
const nums = [1, 3, 12, 0, 0];

moveZeroes(nums);

console.log(nums);
