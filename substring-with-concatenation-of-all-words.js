/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = function (s, words) {
  const wordsQuantities = new Map();

  words.forEach((word) => {
    const wordQty = wordsQuantities.get(word);
    wordsQuantities.set(word, wordQty ? wordQty + 1 : 1);
  });

  const allWordsCharsQty = words[0].length * words.length;

  for (let i = 0; i < s.length; i++) {}
};
