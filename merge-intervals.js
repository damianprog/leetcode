/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
  const result = [];

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
        }
      } else if (intervals[i][1] >= intervals[j][0]) {
        const currentMin = Math.min(intervals[i][0], intervals[j][0]);
        const currentMax = intervals[j][1];
      }
    }
  }
};
