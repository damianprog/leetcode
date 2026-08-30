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

  const result = [];

  for (let offset = 0; offset < words[0].length; offset++) {
    let left = offset;
    let seen = new Map();
    let count = 0;

    for (
      let right = offset;
      right + words[0].length <= s.length;
      right += words[0].length
    ) {
      const chunk = s.slice(right, right + words[0].length);

      const wordQty = wordsQuantities.get(chunk);

      if (!wordQty) {
        left = right + words[0].length;
        seen = new Map();
        count = 0;
      } else if (!seen.has(chunk) || seen.get(chunk) + 1 <= wordQty) {
        seen.set(chunk, (seen.get(chunk) ?? 0) + 1);
        count++;
        if (count === words.length) {
          result.push(left);
          const leftmostChunk = s.slice(left, left + words[0].length);
          seen.set(leftmostChunk, seen.get(leftmostChunk) - 1);
          left += words[0].length;
          count--;
        }
      } else {
        seen.set(chunk, seen.get(chunk) + 1);
        count++;
        let chunkRemoved = "";

        while (chunkRemoved !== chunk) {
          chunkRemoved = s.slice(left, left + words[0].length);

          left += words[0].length;

          count--;

          seen.set(chunkRemoved, seen.get(chunkRemoved) - 1);
        }
      }

      // const expected = (right - left) / words[0].length + 1;
      // if (count !== expected) {
      //   console.log("INVARIANT BROKEN", {
      //     right,
      //     left,
      //     count,
      //     expected,
      //     chunk,
      //     seen,
      //   });
      // }
    }
  }

  return result;
};

// const s = "barfoothefoobarman";
// const s = "thefoobarman";
// const s = "thefoobar";
// const s = "thefoobar";

// const words = ["foo", "bar"];

// const s = "barfoofoobarthefoobarman";
// const words = ["bar", "foo", "the"];

const s = "foofoobar";
const words = ["foo", "bar"];

console.log(findSubstring(s, words));
