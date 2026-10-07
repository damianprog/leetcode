/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
  // if (s.length !== t.length) return false;

  // const sCharQty = new Map();

  // for (const char of s) {
  //   sCharQty.set(char, (sCharQty.get(char) ?? 0) + 1);
  // }

  // for (const char of t) {
  //   const tCharQtyInS = sCharQty.get(char);
  //   if (!sCharQty.has(char) || tCharQtyInS === 0) {
  //     return false;
  //   } else {
  //     sCharQty.set(char, tCharQtyInS - 1);
  //   }
  // }

  // return true;

  return s.split("").sort().join("") === t.split("").sort().join("");
};

const s = "anagram";
const t = "nagaram";

isAnagram(s, t);
