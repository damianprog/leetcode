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

  const wordToIndexes = new Map();

  for (let i = 0; i < wordsWithSortedChars.length; i++) {
    const currentWordIndexes = wordToIndexes.get(wordsWithSortedChars[i]) ?? [];
    currentWordIndexes.push(strs[i]);
    wordToIndexes.set(wordsWithSortedChars[i], currentWordIndexes);
  }

  const result = [];

  for (const [_, value] of wordToIndexes) {
    result.push(value);
  }

  return result;
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];

console.log(groupAnagrams(strs));
