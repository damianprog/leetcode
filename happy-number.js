/**
 * @param {number} n
 * @return {boolean}
 */

const sumOfSquares = function (n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = (n - digit) / 10;
  }
  return sum;
};

const isHappy = function (n) {
  // const seen = new Set();
  // let number = n;

  // while (true) {
  //   if (number === 1) return true;

  //   if (seen.has(number)) return false;
  //   seen.add(number);

  //   let currentSum = 0;

  //   while (number > 0) {
  //     const digit = number % 10;

  //     currentSum += digit * digit;

  //     number = (number - digit) / 10;
  //   }

  //   number = currentSum;
  // }

  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquares(n);
  }

  return n === 1;
};

console.log(isHappy(2));
