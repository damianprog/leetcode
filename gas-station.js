/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  // const gasSum = gas.reduce((sum, currentValue) => sum + currentValue, 0);
  // const costSum = cost.reduce((sum, currentValue) => sum + currentValue, 0);

  // if (gasSum < costSum) return -1;

  // let start = 0;
  // let currentTank = 0;

  // for (let i = 0; i < gas.length; i++) {
  //   currentTank += gas[i] - cost[i];
  //   if (currentTank < 0) {
  //     start = i + 1;
  //     currentTank = 0;
  //   }
  // }

  // return start;

  // ===========================================================================
  let total = 0; // existence check (sum of all diff)
  let currentTank = 0; // running balance od bieżącego startu
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    currentTank += diff;

    if (currentTank < 0) {
      start = i + 1; // przeskocz martwy blok start..i
      currentTank = 0; // reset
    }
  }

  return total >= 0 ? start : -1;

  // ===========================================================================
};

const gas = [4, 5, 2, 6, 5, 3];

const cost = [3, 2, 7, 3, 2, 9];

console.log(canCompleteCircuit(gas, cost));
