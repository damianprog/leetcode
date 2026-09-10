/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
  // const tUniqueChars = new Set(t);

  // let currentSubstring = "";
  // let result = "";
  // let tCharsCounter = 0;
  // let substringUniqueCharsFromT = new Set();

  // for (let i = 0; i < s.length; i++) {
  //   if (
  //     substringUniqueCharsFromT.size < tUniqueChars.size &&
  //     (result.length === 0 || currentSubstring.length < result.length - 1)
  //   ) {
  //     currentSubstring += s[i];

  //     if (tUniqueChars.has(s[i])) {
  //       substringUniqueCharsFromT.add(s[i]);
  //     }
  //   } else {
  //     if (substringUniqueCharsFromT.size === tUniqueChars.size) {
  //       result = currentSubstring;
  //     } else {
  //     }

  //     currentSubstring = "";
  //     tCharsCounter = 0;
  //   }
  // }

  const tCharsQuantities = new Map();

  for (const char of t) {
    tCharsQuantities.set(char, (tCharsQuantities.get(char) ?? 0) + 1);
  }

  let currentSubstring = "";
  let result = "";
  let tCharsCounter = 0;

  for (let i = 0; i < s.length; i++) {
    if (
      tCharsCounter < t.length &&
      (result.length === 0 || currentSubstring.length < result.length - 1)
    ) {
      currentSubstring += s[i];

      const tCharQty = tCharsQuantities.get(s[i]);

      if (tCharQty) {
        tCharsQuantities.set(s[i], tCharQty - 1);
        tCharsCounter++;
      }
    } else {
      if (result.length === 0 || currentSubstring.length < result.length - 1) {
        result = currentSubstring;
      } else {
      }

      // currentSubstring = "";
      tCharsCounter = 0;
    }
  }
};
