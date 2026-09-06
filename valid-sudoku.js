/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) {
  // for (let i = 0; i < 9; i++) {
  //   const numbers = new Set();
  //   for (let j = 0; j < 9; j++) {
  //     if (board[i][j] !== ".") {
  //       if (numbers.has(board[i][j])) {
  //         return false;
  //       } else {
  //         numbers.add(board[i][j]);
  //       }
  //     }
  //   }
  // }

  // for (let i = 0; i < 9; i++) {
  //   const numbers = new Set();
  //   for (let j = 0; j < 9; j++) {
  //     if (board[j][i] !== ".") {
  //       if (numbers.has(board[j][i])) {
  //         return false;
  //       } else {
  //         numbers.add(board[j][i]);
  //       }
  //     }
  //   }
  // }

  // for (let i = 0; i < 3; i++) {
  //   for (let j = 0; j < 3; j++) {
  //     const offsetY = i * 3;
  //     const offsetX = j * 3;

  //     const numbers = new Set();

  //     for (let k = 0; k < 3; k++) {
  //       for (let l = 0; l < 3; l++) {
  //         if (board[offsetY + k][offsetX + l] !== ".") {
  //           if (numbers.has(board[offsetY + k][offsetX + l])) {
  //             return false;
  //           } else {
  //             numbers.add(board[offsetY + k][offsetX + l]);
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // return true;

  // ======================================================================================

  const rowsSets = [];
  const colsSets = [];
  const boxesSets = [];

  [rowsSets, colsSets, boxesSets].forEach((sets) => {
    for (let i = 0; i < 9; i++) {
      sets.push(new Set());
    }
  });

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = board[i][j];
      if (cell !== ".") {
        if (rowsSets[i].has(cell)) {
          return false;
        } else {
          rowsSets[i].add(cell);
        }

        if (colsSets[j].has(cell)) {
          return false;
        } else {
          colsSets[j].add(cell);
        }
      }
    }
  }

  // ======================================================================================
};

// const board = [
//   ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ];

const board = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log(isValidSudoku(board));
