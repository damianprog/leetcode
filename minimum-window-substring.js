/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
  const tUniqueChars = new Set();

  for (const char of t) {
    tUniqueChars.add(char);
  }

  let currentSubstring = "";
  let result = "";
  let tCharsCounter = 0;
  let substringUniqueCharsFromT = new Set();

  for (let i = 0; i < s.length; i++) {
    if (
      substringUniqueCharsFromT.size < tUniqueChars.size &&
      (result.length === 0 || currentSubstring.length < result.length - 1)
    ) {
      currentSubstring += s[i];

      if (tUniqueChars.has(s[i])) {
        substringUniqueCharsFromT.add(s[i]);
      }
    } else {
      if (substringUniqueCharsFromT.size < tUniqueChars.size) {
        result = currentSubstring;
      } else {
      }

      currentSubstring = "";
      tCharsCounter = 0;
    }
  }
};
