/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
const wordPattern = function (pattern, s) {
  const words = s.split(" ");

  if (words.length !== pattern.length) return false;

  const charWords = new Map();
  const wordChars = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const currentCharWord = charWords.get(pattern[i]);
    const currentWordChar = wordChars.get(words[i]);
    if (!currentCharWord && !currentWordChar) {
      charWords.set(pattern[i], words[i]);
      wordChars.set(words[i], pattern[i]);
    } else if (
      (currentCharWord && currentCharWord !== words[i]) ||
      (currentWordChar && currentWordChar !== pattern[i])
    ) {
      return false;
    }
  }

  return true;
};
