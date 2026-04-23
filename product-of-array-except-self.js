/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  // const frontIndexProducts = new Map();
  // const backIndexProducts = new Map();
  // frontIndexProducts.set(0, nums[0]);
  // backIndexProducts.set(0, nums[nums.length - 1]);
  // let currentFrontProduct = nums[0];
  // let currentBackProduct = nums[nums.length - 1];
  // for (let i = 1; i < nums.length; i++) {
  //   currentFrontProduct *= nums[i];
  //   frontIndexProducts.set(i, currentFrontProduct);
  //   currentBackProduct *= nums[nums.length - 1 - i];
  //   backIndexProducts.set(i, currentBackProduct);
  // }
  // const answer = [];
  // for (let i = 0; i < nums.length; i++) {
  //   const prefixProduct = i === 0 ? 1 : frontIndexProducts.get(i - 1);
  //   const suffixProduct =
  //     i === nums.length - 1 ? 1 : backIndexProducts.get(nums.length - 2 - i);
  //   const result = prefixProduct * suffixProduct;
  //   const cleanResult = result === 0 ? 0 : result;
  //   answer[i] = cleanResult;
  // }
  // return answer;
  // ============================================================================
  // Najlepsza wersja

  const answer = new Array(nums.length).fill(1);

  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    const result = answer[i] * suffix;
    answer[i] = result === 0 ? 0 : result; // usuwa też -0
    suffix *= nums[i];
  }

  return answer;
};

// const nums = [1, 2, 3, 4];
const nums = [-1, 1, 0, -3, 3];

console.log(productExceptSelf(nums));
