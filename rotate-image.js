/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  for (let laps = 0; laps < Math.floor(matrix[0].length / 2); laps++) {
    for (let i = 0; i < matrix[0].length - 1; i++) {
      for (let j = 0; j < 4; j++) {
        if (i === 0) {
          const prevElement = matrix[0][matrix[0].length - 1];
          matrix[0][matrix[0].length - 1] = matrix[0][0];
        }
      }
    }
  }
};
