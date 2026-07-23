/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (numbers, target) {
  // for (let i = 0; i < numbers.length - 1; i++) {
  //   const wanted = target - numbers[i];

  //   let lo = i + 1;
  //   let hi = numbers.length - 1;

  //   while (lo <= hi) {
  //     const mid = Math.floor((lo + hi) / 2);

  //     if (numbers[mid] === wanted) {
  //       return [i + 1, mid + 1];
  //     } else if (numbers[mid] > wanted) {
  //       hi = mid - 1;
  //     } else {
  //       lo = mid + 1;
  //     }
  //   }
  // }

  let head = 0;
  let tail = numbers.length - 1;

  while (head < tail) {
    const sum = numbers[head] + numbers[tail];
    if (sum > target) {
      tail--;
    } else if (sum < target) {
      head++;
    } else {
      return [head + 1, tail + 1];
    }
  }

  return [-1, -1];
};

const numbers = [-5, -3, 0, 2, 4, 6, 8];
const target = 5;

twoSum(numbers, target);
