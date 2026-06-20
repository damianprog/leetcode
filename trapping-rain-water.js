/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const leftMax = [];
  let currentLeftMax = 0;

  for (let i = 0; i < height.length; i++) {
    currentLeftMax = Math.max(currentLeftMax, height[i]);
    leftMax.push(currentLeftMax);
  }

  const rightMax = new Array(height.length);
  let currentRightMax = 0;

  for (let i = height.length - 1; i >= 0; i--) {
    currentRightMax = Math.max(currentRightMax, height[i]);
    rightMax[i] = currentRightMax;
  }

  let totalWaterUnits = 0;

  for (let i = 0; i < height.length; i++) {
    totalWaterUnits += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return totalWaterUnits;
};
