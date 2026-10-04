const gameOfLife = function (board) {
  // const boardCopy = board.map((row) => [...row]);

  // for (let row = 0; row < boardCopy.length; row++) {
  //   for (let col = 0; col < boardCopy[0].length; col++) {
  //     let livingNeighbors = 0;

  //     for (let i = row - 1; i < row + 2; i++) {
  //       if (!boardCopy[i]) continue;
  //       for (let j = col - 1; j < col + 2; j++) {
  //         if (!boardCopy[i][j]) continue;
  //         if (i === row && j === col) continue;
  //         if (boardCopy[i][j] === 1) livingNeighbors++;
  //       }
  //     }

  //     if (boardCopy[row][col] === 1) {
  //       if (livingNeighbors < 2 || livingNeighbors > 3) {
  //         board[row][col] = 0;
  //       }
  //     } else if (boardCopy[row][col] === 0) {
  //       if (livingNeighbors === 3) {
  //         board[row][col] = 1;
  //       }
  //     }
  //   }
  // }

  // ==================================================================
  // O(1) space

  // let livingNeighbors = 0;
  // let nativeValue = null;

  // for (let row = 0; row < board.length; row++) {
  //   for (let col = 0; col < board[0].length; col++) {
  //     for (let i = row - 1; i < row + 2; i++) {
  //       if (!board[i]) continue;
  //       for (let j = col - 1; j < col + 2; j++) {
  //         if (!board[i][j]) continue;
  //         if (i === row && j === col) continue;
  //         nativeValue = String(board[i][j]).split(",")[0];
  //         if (nativeValue === "1") livingNeighbors++;
  //       }
  //     }

  //     nativeValue = String(board[row][col]).split(",")[0];

  //     if (nativeValue === "1") {
  //       if (livingNeighbors < 2 || livingNeighbors > 3) {
  //         board[row][col] = `${nativeValue},0`;
  //       }
  //     } else if (nativeValue === "0") {
  //       if (livingNeighbors === 3) {
  //         board[row][col] = `${nativeValue},1`;
  //       }
  //     }
  //     livingNeighbors = 0;
  //     nativeValue = null;
  //   }
  // }

  // let newValue = null;

  // for (let row = 0; row < board.length; row++) {
  //   for (let col = 0; col < board[0].length; col++) {
  //     newValue = String(board[row][col]).split(",")[1];

  //     if (newValue) {
  //       board[row][col] = parseInt(newValue);
  //     }
  //   }
  // }
  // ==================================================================

  const rows = board.length;
  const cols = board[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let live = 0;

      for (let i = Math.max(0, r - 1); i <= Math.min(rows - 1, r + 1); i++) {
        for (let j = Math.max(0, c - 1); j <= Math.min(cols - 1, c + 1); j++) {
          if (i === r && j === c) continue;
          if (Math.abs(board[i][j]) === 1) live++;
        }
      }

      if (board[r][c] === 1 && (live < 2 || live > 3)) board[r][c] = -1;
      if (board[r][c] === 0 && live === 3) board[r][c] = 2;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      board[r][c] = board[r][c] > 0 ? 1 : 0;
    }
  }

  // ==================================================================
};

const board = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];

gameOfLife(board);

console.log(board);
