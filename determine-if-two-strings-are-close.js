/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */

// const setOccurrences = (prevOccurrence, occurrencesMap) => {
//   if (prevOccurrence) {
//     const occurrences = occurrencesMap.get(prevOccurrence);

//     if (occurrences === 1) {
//       occurrencesMap.delete(prevOccurrence);
//     } else {
//       occurrencesMap.set(prevOccurrence, occurrences - 1);
//     }
//   }

//   const newOccurrences = occurrencesMap.get(prevOccurrence + 1) || 0;

//   occurrencesMap.set(prevOccurrence + 1, newOccurrences + 1);
// };

var closeStrings = function (word1, word2) {
  // if (word1.length !== word2.length) return false;

  // const word1Map = new Map();
  // const word2Map = new Map();

  // const word1OccurrencesMap = new Map();
  // const word2OccurrencesMap = new Map();

  // for (const char of word1) {
  //   const charOccurrences = word1Map.get(char) || 0;

  //   setOccurrences(charOccurrences, word1OccurrencesMap);

  //   word1Map.set(char, charOccurrences + 1);
  // }

  // for (const char of word2) {
  //   const charOccurrences = word2Map.get(char) || 0;

  //   setOccurrences(charOccurrences, word2OccurrencesMap);

  //   word2Map.set(char, charOccurrences + 1);
  // }

  // const word1MapKeys = new Set(word1Map.keys());
  // const word2MapKeys = new Set(word2Map.keys());

  // if (word1MapKeys.size !== word2MapKeys.size) return false;

  // for (const char of word1MapKeys) {
  //   if (!word2MapKeys.has(char)) return false;
  // }

  // if (word1OccurrencesMap.size !== word2OccurrencesMap.size) return false;

  // for (const [key, value] of word1OccurrencesMap) {
  //   if (
  //     !word2OccurrencesMap.has(key) ||
  //     word2OccurrencesMap.get(key) !== value
  //   ) {
  //     return false;
  //   }
  // }

  // return true;

  // ==========================================================================
  // Prostsza wersja na Map

  if (word1.length !== word2.length) return false;

  const count1 = new Map();
  const count2 = new Map();

  for (const ch of word1) {
    count1.set(ch, (count1.get(ch) || 0) + 1);
  }

  for (const ch of word2) {
    count2.set(ch, (count2.get(ch) || 0) + 1);
  }

  if (count1.size !== count2.size) return false;

  for (const ch of count1.keys()) {
    if (!count2.has(ch)) return false;
  }

  const freq1 = [...count1.values()].sort((a, b) => a - b);
  const freq2 = [...count2.values()].sort((a, b) => a - b);

  for (let i = 0; i < freq1.length; i++) {
    if (freq1[i] !== freq2[i]) return false;
  }

  return true;

  // ==========================================================================
};

const word1 = "cabbba";
const word2 = "abbccc";

console.log(closeStrings(word1, word2));
