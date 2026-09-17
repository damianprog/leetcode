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

  for (let right = 0; right < s.length; right++) {
    const tCharQty = tCharsQuantities.get(s[right]);
    if (tCharQty !== undefined) {
      tCharsQuantities.set(s[right], tCharQty - 1);
      if (tCharQty - 1 >= 0) {
        tCharsCounter++;
      }
    }

    while (left <= right && tCharsCounter === t.length) {
      if (bestLen === 0 || right - left + 1 < bestLen) {
        bestStart = left;
        bestLen = right - left + 1;
      }

      const leftCharTQty = tCharsQuantities.get(s[left]);
      if (leftCharTQty !== undefined) {
        tCharsQuantities.set(s[left], leftCharTQty + 1);
        if (leftCharTQty + 1 > 0) {
          tCharsCounter--;
        }
      }

      left++;
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
