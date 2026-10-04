/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
const wordPattern = function (pattern, s) {
  const words = s.split(" ");
  const charWords = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const currentChar = pattern[i];
    const currentCharWord = charWords.get(currentChar);
    if (!currentCharWord) {
      charWords.set(currentChar, words[i]);
    } else if (currentCharWord !== words[i]) {
      return false;
    }
  }

  return true;
};
