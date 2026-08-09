/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  // const triplets = [];
  // const tripletsStrings = new Set();
  // nums.sort((a, b) => a - b);
  // for (let i = 0; i < nums.length; i++) {
  //   const target = -1 * nums[i];
  //   const numsSpotted = new Set();
  //   for (let j = i + 1; j < nums.length; j++) {
  //     const wanted = target - nums[j];
  //     if (numsSpotted.has(wanted)) {
  //       const tripletString = `${nums[i]},${nums[j]},${wanted}`;
  //       if (!tripletsStrings.has(tripletString)) {
  //         triplets.push([nums[i], nums[j], wanted]);
  //         tripletsStrings.add(tripletString);
  //       }
  //     } else {
  //       numsSpotted.add(nums[j]);
  //     }
  //   }
  // }
  // return triplets;
  // =========================================================================================
  // Wersja kanoniczna Sort + Zbiegające się two pointers

  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // early exit: dalej same dodatnie, suma nigdy 0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // pomiń powtórzone x

    let lo = i + 1,
      hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum === 0) {
        res.push([nums[i], nums[lo], nums[hi]]);
        lo++;
        hi--;
        while (lo < hi && nums[lo] === nums[lo - 1]) lo++; // pomiń powtórzone od lewej
        while (lo < hi && nums[hi] === nums[hi + 1]) hi--; // pomiń powtórzone od prawej
      } else if (sum < 0) {
        lo++; // za mało → podnieś dolną granicę
      } else {
        hi--; // za dużo → obniż górną granicę
      }
    }
  }
  return res;

  // =========================================================================================
};

// const nums = [-1, 0, 1, 2, -1, -4];
const nums = [-1, 0, 1, -1, 0, 1];

console.log(threeSum(nums));
