/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = function (n) {
  const seen = new Set();
  let number = n;
  let currentSum = 0;

  while (true) {
    if (number === 1) return true;
    if (seen.has(number)) return false;
    seen.add(number);
    while (true) {
      const digit = number % 10;

      currentSum += digit * digit;

      if (digit === number) {
        number = currentSum;
        currentSum = 0;
        break;
      }

      number = (number - digit) / 10;
    }
  }
};

console.log(isHappy(2));
