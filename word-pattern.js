/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
const wordPattern = function (pattern, s) {
  const words = s.split(" ");

  if (words.length !== pattern.length) return false;

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    const w = words[i];
    if (!charToWord.has(c) && !wordToChar.has(w)) {
      charToWord.set(c, w);
      wordToChar.set(w, c);
    } else if (charToWord.get(c) !== w) {
      return false;
    }
  }

  return true;
};
