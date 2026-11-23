/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
  const result = [];

  const overlappedIntervalsIndexes = new Set();

  for (let i = 0; i < intervals.length - 1; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      if (
        intervals[i][1] >= intervals[j][0] &&
        intervals[i][1] >= intervals[j][1]
      ) {
        if (intervals[i][0] <= intervals[j][1]) {
          const currentMin = Math.min(intervals[i][0], intervals[j][0]);
          const currentMax = intervals[i][1];

          result.push([currentMin, currentMax]);
          overlappedIntervalsIndexes.add(i);
          overlappedIntervalsIndexes.add(j);
        }
      } else if (intervals[i][1] >= intervals[j][0]) {
        const currentMin = Math.min(intervals[i][0], intervals[j][0]);
        const currentMax = intervals[j][1];
        result.push([currentMin, currentMax]);
        overlappedIntervalsIndexes.add(i);
        overlappedIntervalsIndexes.add(j);
      }
    }
  }

  for (let i = 0; i < intervals.length; i++) {
    if (!overlappedIntervalsIndexes.has(i)) {
      result.push(intervals[i]);
    }
  }

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

const intervals = [
  [4, 7],
  [1, 4],
];

console.log(merge(intervals));
