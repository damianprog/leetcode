/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  //   let rightPlotCount = 0;

  //   for (let i = 0; i < flowerbed.length; i++) {
  //     if (flowerbed[i] === 0 && !flowerbed[i - 1] && !flowerbed[i + 1]) {
  //       flowerbed[i] = 1;
  //       rightPlotCount++;
  //     }
  //   }

  //   return rightPlotCount >= n;

  let planted = 0;

  for (let i = 0; i < flowerbed.length; i++) {
    const emptyCurrent = flowerbed[i] === 0;
    const emptyLeft = i === 0 || flowerbed[i - 1] === 0;
    const emptyRight = i === flowerbed.length - 1 || flowerbed[i + 1] === 0;

    if (emptyCurrent && emptyLeft && emptyRight) {
      flowerbed[i] = 1;
      planted++;

      if (planted >= n) return true;
    }
  }

  return planted >= n;
};
