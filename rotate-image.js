/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  const n = matrix.length - 1;

  for (let laps = 0; laps < Math.floor(matrix[0].length / 2); laps++) {
    for (let i = 0; i < matrix[0].length - laps * 2 - 1; i++) {
      [matrix[laps][laps + i], matrix[i + laps][n - laps]] = [
        matrix[i + laps][n - laps],
        matrix[laps][laps + i],
      ];
      [matrix[laps][laps + i], matrix[n - laps][n - i - laps]] = [
        matrix[n - laps][n - i - laps],
        matrix[laps][laps + i],
      ];
      [matrix[laps][laps + i], matrix[n - i - laps][laps]] = [
        matrix[n - i - laps][laps],
        matrix[laps][laps + i],
      ];
    }
  }
};

// const matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

const matrix = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];

rotate(matrix);

console.log(matrix);
