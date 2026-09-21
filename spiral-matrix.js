/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

// const DIRECTION = {
//   right: "right",
//   down: "down",
//   left: "left",
//   up: "up",
// };

const spiralOrder = function (matrix) {
  // const result = [];
  // let currentDirection = DIRECTION.right;
  // let currentRow = 0;
  // let currentCol = 0;
  // let currentLap = 0;
  // while (true) {
  //   while (true) {
  //     result.push(matrix[currentRow][currentCol]);
  //     if (currentDirection === DIRECTION.right) {
  //       if (currentCol + 1 < matrix[0].length - currentLap) {
  //         currentCol++;
  //       } else {
  //         currentRow++;
  //         currentDirection = DIRECTION.down;
  //         break;
  //       }
  //     } else if (currentDirection === DIRECTION.down) {
  //       if (currentRow + 1 < matrix.length - currentLap) {
  //         currentRow++;
  //       } else {
  //         currentCol--;
  //         currentDirection = DIRECTION.left;
  //         break;
  //       }
  //     } else if (currentDirection === DIRECTION.left) {
  //       if (currentCol - 1 >= currentLap) {
  //         currentCol--;
  //       } else {
  //         currentRow--;
  //         currentDirection = DIRECTION.up;
  //         break;
  //       }
  //     } else if (currentDirection === DIRECTION.up) {
  //       if (currentRow - 1 > currentLap) {
  //         currentRow--;
  //       } else {
  //         currentCol++;
  //         currentDirection = DIRECTION.right;
  //         break;
  //       }
  //     }
  //   }
  //   if (currentDirection === DIRECTION.right) currentLap++;
  //   if (result.length === matrix[0].length * matrix.length) {
  //     return result;
  //   }
  // }

  // ============================================================================
  // Canonical solution

  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;

    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;

    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }

    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }

  return result;

  // ============================================================================
};

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

console.log(spiralOrder(matrix));
