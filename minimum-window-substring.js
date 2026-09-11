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

  let currentSubstring = "";
  let result = "";
  let tCharsCounter = 0;
  let left = 0;

  for (let i = 0; i < s.length; i++) {
    currentSubstring += s[i];

    const tCharQty = tCharsQuantities.get(s[i]);

    if (tCharQty) {
      tCharsQuantities.set(s[i], tCharQty - 1);
      tCharsCounter++;
    }

    if (
      tCharsCounter === t.length ||
      (result.length > 0 && currentSubstring.length === result.length - 1)
    ) {
      if (tCharsCounter === t.length) {
        result = currentSubstring;
      }

      const leftCharTQty = tCharsQuantities.get(s[left]);
      if (leftCharTQty || leftCharTQty === 0) {
        tCharsQuantities.set(s[left], leftCharTQty + 1);
        tCharsCounter--;
      }

      left++;

      while (left < i && !tCharsQuantities.has(s[left])) {
        left++;
      }

      currentSubstring = s.slice(left, i + 1);
    }
  }

  return result;
};

// const s = "ADOBECODEBANC";
// // const s = "BANC";
// const t = "ABC";

// const s = "a";
// const t = "a";

// const s = "a";
// const t = "aa";

// const s = "ab";
// const t = "b";

// const s = "aabc";
// const t = "abbc";

const s = "abc";
const t = "b";

console.log(minWindow(s, t));
