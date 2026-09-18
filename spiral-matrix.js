/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

const DIRECTION = {
  right: "right",
  down: "down",
  left: "left",
  up: "up",
};

const getNextDirection = function (currentDirection) {
  switch (currentDirection) {
    case DIRECTION.right:
      return DIRECTION.down;
    case DIRECTION.down:
      return DIRECTION.left;
    case DIRECTION.left:
      return DIRECTION.up;
    case DIRECTION.up:
      return DIRECTION.right;
    default:
      return false;
  }
};

const spiralOrder = function (matrix) {
  const visitedCoords = new Set();
  const result = [];

  let currentDirection = DIRECTION.right;
  let currentRow = 0;
  let currentCol = 0;

  while (currentDirection) {
    if (currentDirection === DIRECTION.right) {
      while (true) {
        visitedCoords.add(`${currentRow},${currentCol}`);
        result.push(matrix[currentRow][currentCol]);

        if (
          matrix[currentRow][currentCol + 1] !== undefined &&
          !visitedCoords.has(`${currentRow},${currentCol + 1}`)
        ) {
          currentCol++;
        } else {
          currentDirection = getNextDirection(currentDirection);
          currentRow++;
          break;
        }
      }
    } else if (currentDirection === DIRECTION.down) {
      while (true) {
        visitedCoords.add(`${currentRow},${currentCol}`);
        result.push(matrix[currentRow][currentCol]);

        if (
          matrix[currentRow + 1][currentCol] !== undefined &&
          !visitedCoords.has(`${currentRow + 1},${currentCol}`)
        ) {
          currentRow++;
        } else {
          currentDirection = getNextDirection(currentDirection);
          currentCol--;
          break;
        }
      }
    } else if (currentDirection === DIRECTION.left) {
    }

    if (matrix[currentRow][currentCol] === undefined) return result;
  }
};
