/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  let windowMaxVowels = 0;

  for (let i = 0; i < k; i++) {
    if (vowels.has(s[i])) {
      windowMaxVowels++;
    }
  }

  if (windowMaxVowels === k) return k;

  let maxVowels = windowMaxVowels;

  for (let i = k; i < s.length; i++) {
    if (vowels.has(s[i - k])) windowMaxVowels--;
    if (vowels.has(s[i])) windowMaxVowels++;

    if (windowMaxVowels === k) return k;

    if (maxVowels < windowMaxVowels) maxVowels = windowMaxVowels;
  }

  return maxVowels;
};

const s = "tryhard";
const k = 4;

console.log(maxVowels(s, k));
