/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  // if (!nums.length) return [];

  // const ranges = [];
  // let beginning = nums[0];
  // let range = `${nums[0]}`;

  // for (let i = 1; i <= nums.length; i++) {
  //   range =
  //     beginning === nums[i - 1]
  //       ? `${beginning}`
  //       : `${beginning}->${nums[i - 1]}`;

  //   if (nums[i] !== nums[i - 1] + 1) {
  //     ranges.push(range);
  //     beginning = nums[i];
  //     range = "";
  //   }
  // }

  // if (range) ranges.push(range);

  // return ranges;

  // ============================================================

  // if (!nums.length) return [];

  // const ranges = [];
  // let start = nums[0];

  // for (let i = 1; i <= nums.length; i++) {
  //   if (nums[i] !== nums[i - 1] + 1) {
  //     if (start === nums[i - 1]) {
  //       ranges.push(`${start}`);
  //     } else {
  //       ranges.push(`${start}->${nums[i - 1]}`);
  //     }

  //     start = nums[i];
  //   }
  // }

  // return ranges;

  // ============================================================

  // Najczytelniejsza wersja

  const result = [];
  let i = 0;

  while (i < nums.length) {
    let start = nums[i];

    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }

    let end = nums[i];
    result.push(start === end ? `${start}` : `${start}->${end}`);
    i++;
  }

  return result;
};
