/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  //   const prefix = [0];

  //   for (const num of nums) {
  //     prefix.push(prefix[prefix.length - 1] + num);
  //   }

  //   for (let i = 0; i < nums.length; i++) {
  //     if (prefix[i] === prefix[nums.length] - prefix[i + 1]) {
  //       return i;
  //     }
  //   }

  //   return -1;

  // =======================================================================
  // Lepsza wersja

  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const rightSum = totalSum - leftSum - nums[i];

    if (leftSum === rightSum) {
      return i;
    }

    leftSum += nums[i];
  }

  return -1;

  // =======================================================================
};
