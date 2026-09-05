/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
const canConstruct = function (ransomNote, magazine) {
  const magazineMap = new Map();

  for (const letter of magazine) {
    magazineMap.set(letter, (magazineMap.get(letter) ?? 0) + 1);
  }

  for (const letter of ransomNote) {
    const letterQty = magazineMap.get(letter);

    if (letterQty) {
      magazineMap.set(letter, letterQty - 1);
    } else {
      return false;
    }
  }

  return true;
};
