/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  // const wordsWithSortedChars = [...strs].map((str) =>
  //   str.split("").toSorted().join(""),
  // );

  // const searchedWords = new Set();

  // const sortedWordsGroups = [];

  // for (let i = 0; i < wordsWithSortedChars.length; i++) {
  //   if (!searchedWords.has(wordsWithSortedChars[i])) {
  //     const currentWordsGrouped = [];

  //     for (let j = 0; j < wordsWithSortedChars.length; j++) {
  //       if (wordsWithSortedChars[i] === wordsWithSortedChars[j]) {
  //         currentWordsGrouped.push(j);
  //       }
  //     }

  //     sortedWordsGroups.push(currentWordsGrouped);

  //     searchedWords.add(wordsWithSortedChars[i]);
  //   }
  // }

  // const result = [];

  // for (let i = 0; i < sortedWordsGroups.length; i++) {
  //   const strsGrouped = [];
  //   for (const index of sortedWordsGroups[i]) {
  //     strsGrouped.push(strs[index]);
  //   }

  //   result.push(strsGrouped);
  // }

  // return result;

  const wordsWithSortedChars = [...strs].map((str) =>
    str.split("").toSorted().join(""),
  );

  const wordsToIndexes = new Map();

  for (let i = 0; i < wordsWithSortedChars.length; i++) {
    wordsToIndexes.set(i, wordsWithSortedChars[i]);
  }

  const wordsToIndexesSorted = new Map(
    [...wordsToIndexes].sort(([, a], [, b]) => a.localeCompare(b)),
  );

  let wordsGrouped = [];
  let result = [];
  let prevWord = wordsToIndexesSorted.values().next().value;

  for (const [key, value] of wordsToIndexesSorted) {
    if (value === prevWord) {
      wordsGrouped.push(strs[key]);
    } else {
      result.push(wordsGrouped);
      wordsGrouped = [strs[key]];
    }

    prevWord = value;
  }

  if (wordsGrouped.length > 0) {
    result.push(wordsGrouped);
  }

  return result;
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];

console.log(groupAnagrams(strs));
