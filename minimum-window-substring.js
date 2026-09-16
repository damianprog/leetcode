/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
  const tCharsQuantities = new Map();

  for (const char of t) {
    tCharsQuantities.set(char, (tCharsQuantities.get(char) ?? 0) + 1);
  }

  let tCharsCounter = 0;
  let left = 0;
  let bestStart = 0;
  let bestLen = 0;

  for (let i = 0; i < s.length; i++) {
    if (tCharsQuantities.has(s[i])) {
      const tCharQty = tCharsQuantities.get(s[i]);
      tCharsQuantities.set(s[i], tCharQty - 1);
      if (tCharQty - 1 >= 0) {
        tCharsCounter++;
      }
    }

    if (
      tCharsCounter === t.length ||
      (bestLen > 0 && i - left + 1 === bestLen - 1)
    ) {
      while (
        left <= i &&
        (tCharsCounter === t.length ||
          (bestLen > 0 && i - left + 1 === bestLen - 1))
      ) {
        if (
          tCharsCounter === t.length &&
          (bestLen === 0 || i - left + 1 < bestLen)
        ) {
          bestStart = left;
          bestLen = i - left + 1;
        }

        if (tCharsQuantities.has(s[left])) {
          const leftCharTQty = tCharsQuantities.get(s[left]);
          tCharsQuantities.set(s[left], leftCharTQty + 1);
          if (leftCharTQty + 1 > 0) {
            tCharsCounter--;
          }
        }

        left++;
      }
    }
  }

  return s.slice(bestStart, bestStart + bestLen);
};

// const s = "ADOBECODEBANC";
// // const s = "BANC";
// const t = "ABC";

// const s = "a";
// const t = "a";

// const s = "bba";
// const t = "ab";

// const s = "ab";
// const t = "b";

// const s = "aabc";
// const t = "abbc";

// const s = "abc";
// const t = "b";

// const s = "cabwefgewcwaefgcf";
// const t = "cae";

// const s = "efgewcwae";
// const t = "cae";

// const s = "aaaaaaaaaaaabbbbbcdd";
// const t = "abcdd";

const s = "aabbbbbcdd";
const t = "abcdd";

// expected: "abbbbbcdd"

console.log(minWindow(s, t));
