/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const counts = new Map();

  for (const char of s) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  for (const char of t) {
    const count = counts.get(char);
    // explicitly showing two conditions instead of one "is falsy" condition
    if (count === undefined || count === 0) {
      return false;
    }
    counts.set(char, count - 1);
  }

  return true;

  // return s.split("").sort().join("") === t.split("").sort().join("");
};

const s = "anagram";
const t = "nagaram";

isAnagram(s, t);
