/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  const wordsWithSortedChars = [...strs].map((str) =>
    str.split("").toSorted().join(""),
  );

  const searchedWords = new Set();

  const sortedWordsGroups = [];

  for (let i = 0; i < wordsWithSortedChars.length; i++) {
    if (!searchedWords.has(wordsWithSortedChars[i])) {
      const currentWordsGrouped = [];

      for (const word of wordsWithSortedChars) {
        if (wordsWithSortedChars[i] === word) {
          currentWordsGrouped.push(i);
        }
      }

      sortedWordsGroups.push(currentWordsGrouped);

      searchedWords.add(wordsWithSortedChars[i]);
    }
  }

  // console.log("strs: ", strs);
  console.log("sortedWordsGroups: ", sortedWordsGroups);

  const result = [];

  for (let i = 0; i < sortedWordsGroups.length; i++) {
    const strsGrouped = [];
    for (const index of sortedWordsGroups[i]) {
      strsGrouped.push(strs[index]);
    }

    result.push(strsGrouped);
  }

  return result;
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];

console.log(groupAnagrams(strs));
