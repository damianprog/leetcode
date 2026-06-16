/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const candy = new Array(ratings.length).fill(1);

  for (let i = 1; i < candy.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candy[i] = Math.max(candy[i], candy[i - 1] + 1);
    }
  }

  for (let i = candy.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candy[i] = Math.max(candy[i], candy[i + 1] + 1);
    }
  }

  return candy.reduce((acc, currentValue) => acc + currentValue, 0);
};
