/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = function (s, words) {
  // const wordsQuantities = new Map();

  // words.forEach((word) => {
  //   const wordQty = wordsQuantities.get(word);
  //   wordsQuantities.set(word, (wordQty ?? 0) + 1);
  // });

  // const permutationLength = words[0].length * words.length;

  // const result = [];

  // for (let i = 0; i <= s.length - permutationLength; i++) {
  //   let frag = "";
  //   const wordsQuantitiesCopy = new Map(wordsQuantities);
  //   for (let j = 0; j < permutationLength; j++) {
  //     frag += s[i + j];

  //     if (frag.length === words[0].length) {
  //       const wordQuantity = wordsQuantitiesCopy.get(frag);
  //       if (wordQuantity) {
  //         wordsQuantitiesCopy.set(frag, wordQuantity - 1);
  //       } else {
  //         break;
  //       }
  //       frag = "";
  //     }

  //     if (j === permutationLength - 1) {
  //       result.push(i);
  //     }
  //   }
  // }

  // return result;

  // =====================================================================================
  // Wersja bardziej optymalna [tu wstawić jej big O]

  const wordsQuantities = new Map();

  words.forEach((word) => {
    const wordQty = wordsQuantities.get(word);
    wordsQuantities.set(word, (wordQty ?? 0) + 1);
  });

  for (let offset = 0; offset < words[0].length; offset++) {
    let left = offset;
    let seen = new Map();
    let count = 0;

    for (
      let right = offset;
      right + words[0].length <= n;
      right += words[0].length
    ) {
      const chunk = s.slice(right, right + L);

      const wordQty = wordsQuantities.get(chunk);

      if (!wordQty) {
        left = right + L;
        seen = new Map();
        count = 0;
      } else if (!seen.has(chunk) || seen.get(chunk) + 1 <= wordQty) {
        seen.set(chunk, (seen.get(chunk) ?? 0) + 1);
      } else {
        let isPrevChunkRemoved = false;

        while (isPrevChunkRemoved) {
          const currentChunk = s.slice(left, left + words[0].length);

          seen.set(currentChunk, seen.get(currentChunk) - 1); // także w seen może być 0
        }
      }
    }
  }
};

const s = "barfoothefoobarman";
const words = ["foo", "bar"];

console.log(findSubstring(s, words));
