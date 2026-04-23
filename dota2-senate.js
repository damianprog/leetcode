/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  let RQty = 0;
  let DQty = 0;
  let RToSkip = 0;
  let DToSkip = 0;

  for (const senator of senate) {
    if (senator === "R") {
      RQty++;
    } else {
      DQty++;
    }
  }

  if (DQty === 0) return "Radiant";
  if (RQty === 0) return "Dire";

  const senateArray = Array.from(senate);

  while (RQty > 0 && DQty > 0) {
    for (let i = 0; i < senateArray.length; i++) {
      if (senateArray[i] === "R") {
        if (RToSkip > 0) {
          senateArray[i] = "*";
          RToSkip--;
        } else {
          DQty--;
          DToSkip++;
        }
      } else if (senateArray[i] === "D") {
        if (DToSkip > 0) {
          senateArray[i] = "*";
          DToSkip--;
        } else {
          RQty--;
          RToSkip++;
        }
      }

      if (DQty === 0) return "Radiant";
      if (RQty === 0) return "Dire";
    }
  }

  // ================================================================================

  // const DIndexes = [];
  // const RIndexes = [];

  // for (let i = 0; i < senate.length; i++) {
  //   if (senate[i] === "D") {
  //     DIndexes.push(i);
  //   } else {
  //     RIndexes.push(i);
  //   }
  // }

  // let DPointer = 0;
  // let RPointer = 0;

  // while (DIndexes.length > 0 && RIndexes.length > 0) {
  //   const currentDIndex = DIndexes[DPointer % DIndexes.length];
  //   const currentRIndex = RIndexes[RPointer % RIndexes.length];

  //   if (currentDIndex < currentRIndex) {
  //     RIndexes.shift();
  //     DPointer++;
  //   } else {
  //     DIndexes.shift();
  //     RPointer++;
  //   }
  // }

  // return DIndexes.length === 0 ? "Radiant" : "Dire";

  // ================================================================================
  // Wersja poprawna

  const rQueue = [];
  const dQueue = [];
  const n = senate.length;

  for (let i = 0; i < n; i++) {
    if (senate[i] === "R") {
      rQueue.push(i);
    } else {
      dQueue.push(i);
    }
  }

  while (rQueue.length && dQueue.length) {
    const rIndex = rQueue.shift();
    const dIndex = dQueue.shift();

    if (rIndex < dIndex) {
      rQueue.push(rIndex + n);
    } else {
      dQueue.push(dIndex + n);
    }
  }

  return rQueue.length ? "Radiant" : "Dire";

  // ================================================================================
};

const senate = "DRDRR";

console.log(predictPartyVictory(senate));
