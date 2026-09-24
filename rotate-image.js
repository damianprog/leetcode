/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  const n = matrix.length - 1;

  for (let laps = 0; laps < Math.floor(matrix[0].length / 2); laps++) {
    for (let i = 0; i < matrix[0].length - 1; i++) {
      for (let j = 0; j < 4; j++) {
        if (j === 0) {
          [matrix[0][0], matrix[0][n]] = [matrix[0][n], matrix[0][0]];
        }
        if (j === 1) {
          [matrix[0][0], matrix[n][n]] = [matrix[n][n], matrix[0][0]];
        }
        if (j === 2) {
          [matrix[0][0], matrix[n][0]] = [matrix[n][0], matrix[0][0]];
        }
      }
    }
  }
};
