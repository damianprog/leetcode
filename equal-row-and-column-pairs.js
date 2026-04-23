/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function (grid) {
  // const columns = [];
  // for (let i = 0; i < grid.length; i++) {
  //   for (let j = 0; j < grid[i].length; j++) {
  //     if (i === 0) columns.push([]);
  //     columns[j].push(grid[i][j]);
  //   }
  // }
  // let found = 0;
  // for (let i = 0; i < grid.length; i++) {
  //   for (let j = 0; j < columns.length; j++) {
  //     let sameFound = 0;
  //     for (let k = 0; k < columns[j].length; k++) {
  //       if (grid[i][k] === columns[j][k]) {
  //         sameFound++;
  //       }
  //     }
  //     if (sameFound === columns.length) {
  //       found++;
  //     }
  //   }
  // }
  // return found;
  // ==================================================================================
  // Prostsza wersja mojego podejścia bez budowania columns
  // const n = grid.length;
  // let count = 0;
  // for (let row = 0; row < n; row++) {
  //   for (let col = 0; col < n; col++) {
  //     let isEqual = true;
  //     for (let k = 0; k < n; k++) {
  //       if (grid[row][k] !== grid[k][col]) {
  //         isEqual = false;
  //         break;
  //       }
  //     }
  //     if (isEqual) count++;
  //   }
  // }
  // return count;
  // ==================================================================================
  // Najlepsze rozwiązanie Map + serializacja
  const n = grid.length;
  const rows = new Map();
  let count = 0;

  for (let i = 0; i < n; i++) {
    const rowKey = grid[i].join(",");
    rows.set(rowKey, (rows.get(rowKey) || 0) + 1);
  }

  for (let col = 0; col < n; col++) {
    const column = [];

    for (let row = 0; row < n; row++) {
      column.push(grid[row][col]);
    }

    const colKey = column.join(",");
    count += rows.get(colKey) || 0;
  }

  return count;
  // ==================================================================================
};

// const grid = [
//   [3, 2, 1],
//   [1, 7, 6],
//   [2, 7, 7],
// ];

const grid = [
  [3, 1, 2, 2],
  [1, 4, 4, 5],
  [2, 4, 2, 2],
  [2, 4, 2, 2],
];

console.log(equalPairs(grid));
