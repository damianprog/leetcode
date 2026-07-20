/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  for (let i = 0; i < numbers.length - 1; i++) {
    const wanted = target - numbers[i];

    let lo = i + 1;
    let hi = numbers.length - 1;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);

      console.log(
        `numbers[i]: ${numbers[i]}, wanted: ${wanted}, numbers[mid]: ${numbers[mid]}`,
      );

      if (numbers[mid] === wanted) {
        return [i + 1, mid + 1];
      } else if (numbers[mid] > target) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
  }
};

const numbers = [-5, -3, 0, 2, 4, 6, 8];
const target = 5;

twoSum(numbers, target);
