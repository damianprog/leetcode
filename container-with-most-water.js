/**
 * @param {number[]} height
 * @return {number}
 */
// var maxArea = function (height) {
//   const result = [];

//   let front = 0;
//   let back = height.length - 1;

//   while (front < back) {
//     result.push(Math.min(height[front], height[back]) * (back - front));

//     if (height[front] < height[back]) {
//       front++;
//     } else if (height[front] > height[back]) {
//       back--;
//     } else {
//       front++;
//       back--;
//     }
//   }

//   return Math.max(...result);
// };

var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const currentArea = Math.min(height[left], height[right]) * width;

    if (currentArea > maxWater) {
      maxWater = currentArea;
    }

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
};

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];

console.log(maxArea(height));
