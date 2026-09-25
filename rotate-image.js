/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  const n = matrix.length - 1;

  for (let laps = 0; laps < Math.floor(matrix[0].length / 2); laps++) {
    for (let i = 0; i < matrix[0].length - laps - 1; i++) {
      for (let j = 0; j < 3; j++) {
        if (j === 0) {
          [matrix[laps][laps + i], matrix[i][n - laps]] = [
            matrix[i][n - laps],
            matrix[laps][laps + i],
          ];
        }
        if (j === 1) {
          [matrix[laps][laps + i], matrix[n - i][n - laps]] = [
            matrix[n - i][n - laps],
            matrix[laps][laps + i],
          ];
        }
        if (j === 2) {
          [matrix[laps][laps + i], matrix[n - i][laps]] = [
            matrix[n - i][laps],
            matrix[laps][laps + i],
          ];
        }
      }
    }
  }
};
