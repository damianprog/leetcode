/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
  const result = [];

  intervals.sort((a, b) => a[0] - b[0]);

  let last = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    if (last[1] >= intervals[i][0]) {
      const merged = [last[0], Math.max(last[1], intervals[i][1])];

      last = merged;
    } else {
      result.push(last);

      last = intervals[i];
    }
  }

  result.push(last);

  return result;
};

// const intervals = [
//   [1, 3],
//   [2, 6],
//   [8, 10],
//   [15, 18],
// ];

// const intervals = [
//   [1, 4],
//   [4, 5],
// ];

// const intervals = [
//   [4, 7],
//   [1, 4],
// ];

const intervals = [
  [2, 5],
  [1, 1],
  [4, 8],
];

console.log(merge(intervals));
