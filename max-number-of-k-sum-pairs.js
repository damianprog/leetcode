/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  //   const wantedNumbers = new Map();
  //   let count = 0;
  //   for (let i = 0; i < nums.length; i++) {
  //     if (nums[i] >= k) continue;
  //     if (wantedNumbers.has(nums[i])) {
  //       count++;
  //       let wantedNumberValue = wantedNumbers.get(nums[i]);
  //       wantedNumberValue--;
  //       if (wantedNumberValue === 0) {
  //         wantedNumbers.delete(nums[i]);
  //       } else {
  //         wantedNumbers.set(nums[i], wantedNumberValue);
  //       }
  //     } else {
  //       const numValueToSet = (wantedNumbers.get(k - nums[i]) || 0) + 1;
  //       wantedNumbers.set(k - nums[i], numValueToSet);
  //     }
  //   }
  //   return count;
  // ==============================================================================
  // Moje rozwiązanie tylko prostszy zapis
  //   const needed = new Map();
  //   let count = 0;
  //   for (const num of nums) {
  //     if ((needed.get(num) || 0) > 0) {
  //       count++;
  //       const remaining = needed.get(num) - 1;
  //       if (remaining === 0) {
  //         needed.delete(num);
  //       } else {
  //         needed.set(num, remaining);
  //       }
  //     } else {
  //       needed.set(k - num, (needed.get(k - num) || 0) + 1);
  //     }
  //   }
  //   return count;
  // ==============================================================================
  // Jeszcze prostsza i bardziej standardowa wersja
  const counts = new Map();
  let operations = 0;

  for (const num of nums) {
    const complement = k - num;

    if ((counts.get(complement) || 0) > 0) {
      operations++;
      counts.set(complement, counts.get(complement) - 1);
    } else {
      counts.set(num, (counts.get(num) || 0) + 1);
    }
  }

  return operations;
  // ==============================================================================
};

// const nums = [1, 2, 3, 4];
const nums = [3, 1, 3, 4, 3];

console.log(maxOperations(nums, 6));
