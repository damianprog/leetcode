/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  // let result = "";
  // for (let i = 0; i < word1.length; i++) {
  //   const secondWordLetter = word2[i] ? word2[i] : "";
  //   result += word1[i] + secondWordLetter;
  //   if (i + 1 >= word1.length && word2[i + 1]) {
  //     result += word2.slice(i + 1);
  //   }
  // }
  // return result;
  // ===========================================================
  // Rozwiązanie w moim stylu ale poprawione
  //   let result = "";
  //   for (let i = 0; i < word1.length; i++) {
  //     result += word1[i];
  //     if (i < word2.length) result += word2[i];
  //   }
  //   if (word2.length > word1.length) {
  //     result += word2.slice(word1.length);
  //   }
  //   return result;
  // ===========================================================
  // Najlepsze rozwiązanie
  //   let result = "";
  //   for (let i = 0; i < Math.max(word1.length, word2.length); i++) {
  //     if (i < word1.length) result += word1[i];
  //     if (i < word2.length) result += word2[i];
  //   }
  //   return result;
  // ===========================================================
};

// const word1 = "abc";
// const word2 = "pqr";

// const word1 = "ab";
// const word2 = "pqrs";

const word1 = "abcd";
const word2 = "pq";

console.log(mergeAlternately(word1, word2));
