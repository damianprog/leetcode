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

  let substringExcessiveTChars = new Map();

  for (let i = 0; i < s.length; i++) {
    currentSubstring += s[i];

    const tCharQty = tCharsQuantities.get(s[i]);

    if (tCharQty === 0) {
      substringExcessiveTChars.set(
        s[i],
        (substringExcessiveTChars.get(s[i]) ?? 0) + 1,
      );
    }

    if (tCharQty && tCharQty !== 0) {
      tCharsQuantities.set(s[i], tCharQty - 1);
      tCharsCounter++;
    }

    if (
      tCharsCounter === t.length ||
      (result.length > 0 && currentSubstring.length === result.length - 1)
    ) {
      if (
        tCharsCounter === t.length &&
        (result.length === 0 || currentSubstring.length < result.length)
      ) {
        result = currentSubstring;
      }

      const excessive = substringExcessiveTChars.get(s[left]);

      if (excessive && excessive !== 0) {
        substringExcessiveTChars.set(s[left], excessive - 1);
      } else if (tCharsQuantities.has(s[left])) {
        const leftCharTQty = tCharsQuantities.get(s[left]);
        tCharsQuantities.set(s[left], leftCharTQty + 1);
        tCharsCounter--;
      }

      left++;

      while (left < i && !tCharsQuantities.has(s[left])) {
        left++;
      }

      currentSubstring = s.slice(left, i + 1);

      if (
        tCharsCounter === t.length &&
        (result.length === 0 || currentSubstring.length < result.length)
      ) {
        result = currentSubstring;
      }
    }
  }

  return result;
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

const s = "aaaaaaaaaaaabbbbbcdd";
const t = "abcdd";
//expected: "abbbbbcdd"

console.log(minWindow(s, t));
