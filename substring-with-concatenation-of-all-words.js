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

  const permutationLength = words[0].length * words.length;

  const result = [];

  for (let i = 0; i <= s.length - permutationLength; i++) {
    let frag = "";
    const wordsQuantitiesCopy = new Map(wordsQuantities);
    for (let j = 0; j < permutationLength; j++) {
      frag += s[i + j];

      if (frag.length === words[0].length) {
        const wordQuantity = wordsQuantitiesCopy.get(frag);
        if (wordQuantity) {
          wordsQuantitiesCopy.set(frag, wordQuantity - 1);
        } else {
          break;
        }
        frag = "";
      }

      if (j === permutationLength - 1) {
        result.push(i);
      }
    }
  }

  return result;
};

const s = "barfoothefoobarman";
const words = ["foo", "bar"];

console.log(findSubstring(s, words));
