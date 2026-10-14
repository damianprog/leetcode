/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = function (n) {
  const seen = new Set();
  let number = n;

  while (true) {
    if (number === 1) return true;

    if (seen.has(number)) return false;
    seen.add(number);

    let currentSum = 0;

    while (number > 0) {
      const digit = number % 10;

      currentSum += digit * digit;

      number = (number - digit) / 10;
    }

    number = currentSum;
  }
};

console.log(isHappy(2));
