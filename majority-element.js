/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const hashMap = {};

  // for (let i = 0; i < nums.length; i++) {
  for (const num of nums) {
    // if (hashMap[nums[i]]) {
    //   hashMap[nums[i]]++;
    // } else {
    //   hashMap[nums[i]] = 1;
    // }

    hashMap[num] = (hashMap[num] || 0) + 1;

    if (hashMap[num] > nums.length / 2) return num;
  }

  // let mostCommon = null;
  // let times = 0;

  // for (const [key, value] of Object.entries(hashMap)) {
  //   if (value > times) {
  //     mostCommon = key;
  //     times = value;
  //   }
  // }

  // return mostCommon;
};

var majorityElementO1Space = function (nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }

    count += num === candidate ? 1 : -1;
  }

  return candidate;
};

// Jeśli jakiś element występuje częściej niż wszystkie pozostałe razem,
// to po wzajemnym kasowaniu różnych elementów tylko on może zostać na końcu.

// const nums = [3, 2, 3];
const nums = [2, 2, 1, 1, 1, 2, 2, 1, 1];

console.log(majorityElementO1Space(nums));
