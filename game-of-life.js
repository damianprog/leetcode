const gameOfLife = function (board) {
  const boardCopy = board.map((row) => [...row]);

  for (let row = 0; row < boardCopy.length; row++) {
    for (let col = 0; col < boardCopy[0].length; col++) {
      let livingNeighbors = 0;

      for (let i = row - 1; i < row + 2; i++) {
        if (!boardCopy[i]) continue;
        for (let j = col - 1; j < col + 2; j++) {
          if (!boardCopy[i][j]) continue;
          if (i === row && j === col) continue;
          if (boardCopy[i][j] === 1) livingNeighbors++;
        }
      }

      if (boardCopy[row][col] === 1) {
        if (livingNeighbors < 2 || livingNeighbors > 3) {
          board[row][col] = 0;
        }
      } else if (boardCopy[row][col] === 0) {
        if (livingNeighbors === 3) {
          board[row][col] = 1;
        }
      }
    }
  }
};

const board = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];

gameOfLife(board);

console.log(board);
