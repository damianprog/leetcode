/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  //   let maxAltitude = 0;

  //   gain.reduce((accumulator, currentValue) => {
  //     const sum = accumulator + currentValue;
  //     maxAltitude = Math.max(maxAltitude, sum);

  //     return sum;
  //   }, 0);

  //   return maxAltitude;

  // ================================================================

  let altitude = 0;
  let maxAltitude = 0;

  for (const diff of gain) {
    altitude += diff;
    maxAltitude = Math.max(maxAltitude, altitude);
  }

  return maxAltitude;

  // ================================================================
};
