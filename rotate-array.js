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

  // let swapCount = 0;
  // let start = 0;

  // while (swapCount < nums.length) {
  //   let destination = (start + k) % nums.length;
  //   let carry = nums[start];
  //   let prevCarry = carry;

  //   while (true) {
  //     carry = nums[destination];
  //     nums[destination] = prevCarry;
  //     swapCount++;

  //     if (destination === start) break;

  //     prevCarry = carry;
  //     destination = (destination + k) % nums.length;
  //   }

  //   start++;
  // }

  // ======================================================================================
  // Wersja kanoniczna podejście cyklowe

  // const n = nums.length;
  // k = k % n; // normalizacja
  // let count = 0;

  // for (let start = 0; count < n; start++) {
  //   // wolę while (swapCount < nums.length)
  //   let current = start;
  //   let carry = nums[start];

  //   do {
  //     const next = (current + k) % n;
  //     [nums[next], carry] = [carry, nums[next]]; // odłóż carry, podnieś to co tam było
  //     current = next;
  //     count++;
  //   } while (current !== start);
  // }

  // ======================================================================================
  // Wersja z reverse

  // Czy powinienem modyfikować oryginalny array czy może zrobić kopie?
  const reverse = (arr, left, right) => {
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];

      left++;
      right--;
    }
  };

  const n = nums.length;
  k = k % n;

  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);

  // ======================================================================================
};
