/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = function (intervals, newInterval) {
  intervals.push(newInterval);

  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];

  let last = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    if (last[1] >= intervals[i][0]) {
      last = [last[0], Math.max(last[1], intervals[i][1])];
    } else {
      result.push(last);
      last = intervals[i];
    }
  }

  result.push(last);

  return result;
};
