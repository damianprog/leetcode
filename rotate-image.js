/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  const size = matrix.length;

  for (let layer = 0; layer < Math.floor(size / 2); layer++) {
    const first = layer;
    const last = size - 1 - layer;

    for (let i = 0; i < last - first; i++) {
      [matrix[first][first + i], matrix[first + i][last]] = [
        matrix[first + i][last],
        matrix[first][first + i],
      ];
      [matrix[first][first + i], matrix[last][last - i]] = [
        matrix[last][last - i],
        matrix[first][first + i],
      ];
      [matrix[first][first + i], matrix[last - i][first]] = [
        matrix[last - i][first],
        matrix[first][first + i],
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
