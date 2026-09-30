/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
  // ===========================================================================================
  // O(m + n) space
  // const rowsToTransform = new Set();
  // const colsToTransform = new Set();
  // for (let row = 0; row < matrix.length; row++) {
  //   for (let col = 0; col < matrix[0].length; col++) {
  //     if (matrix[row][col] === 0) {
  //       rowsToTransform.add(row);
  //       colsToTransform.add(col);
  //     }
  //   }
  // }
  // for (let row = 0; row < matrix.length; row++) {
  //   for (let col = 0; col < matrix[0].length; col++) {
  //     if (rowsToTransform.has(row) || colsToTransform.has(col)) {
  //       matrix[row][col] = 0;
  //     }
  //   }
  // }

  // ===========================================================================================
  // O(1) space

  // for (let row = 0; row < matrix.length; row++) {
  //   for (let col = 0; col < matrix[0].length; col++) {
  //     if (matrix[row][col] === 0) {
  //       matrix[row][col] = ".";
  //       for (let currentCol = 0; currentCol < matrix[0].length; currentCol++) {
  //         if (matrix[row][currentCol] !== 0) {
  //           matrix[row][currentCol] = ".";
  //         }
  //       }

  //       for (let currentRow = 0; currentRow < matrix.length; currentRow++) {
  //         if (matrix[currentRow][col] !== 0) {
  //           matrix[currentRow][col] = ".";
  //         }
  //       }
  //     }
  //   }
  // }

  // for (let row = 0; row < matrix.length; row++) {
  //   for (let col = 0; col < matrix[0].length; col++) {
  //     if (matrix[row][col] === ".") {
  //       matrix[row][col] = 0;
  //     }
  //   }
  // }

  // ======================================================================================
  // Space O(1), Time O(n + m)

  const m = matrix.length;
  const n = matrix[0].length;
  let firstColHasZero = false;

  // 1. Oznaczanie: pierwszy wiersz i pierwsza kolumna jako markery
  for (let row = 0; row < m; row++) {
    if (matrix[row][0] === 0) firstColHasZero = true;
    for (let col = 1; col < n; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0; // marker wiersza
        matrix[0][col] = 0; // marker kolumny
      }
    }
  }

  // 2. Zerowanie wnętrza na podstawie markerów
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  // 3. Pierwszy wiersz, sterowany przez matrix[0][0]
  if (matrix[0][0] === 0) {
    for (let col = 0; col < n; col++) matrix[0][col] = 0;
  }

  // 4. Pierwsza kolumna, sterowana przez osobną flagę
  if (firstColHasZero) {
    for (let row = 0; row < m; row++) matrix[row][0] = 0;
  }

  // ======================================================================================
};

// const matrix = [
//   [1, 1, 1],
//   [1, 0, 1],
//   [1, 1, 1],
// ];

const matrix = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];

setZeroes(matrix);

console.log(matrix);
