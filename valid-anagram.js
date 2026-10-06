/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const sCharQty = new Map();

  for (const char of s) {
    sCharQty.set(char, (sCharQty.get(char) ?? 0) + 1);
  }

  for (const char of t) {
    if (!sCharQty.has(char) || sCharQty.get(char)) return false;
  }
};
