/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
  const uniqueChars = new Set();

  let longestWindowSize = 0;
  let left = 0;
  let right = 0;

  while (right < s.length) {
    while (uniqueChars.has(s[right])) {
      uniqueChars.delete(s[left]);
      left++;
    }

    let windowSize = right - left + 1;
    longestWindowSize = Math.max(longestWindowSize, windowSize);

    uniqueChars.add(s[right]);

    right++;
  }

  return longestWindowSize;
};

// const s = "abcabcbb";
// const s = "bbbbb";
const s = "pwwkew";

console.log(lengthOfLongestSubstring(s));
