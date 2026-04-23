/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let currentWord = "";
  const words = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      if (currentWord.length) {
        words.push(currentWord);
        currentWord = "";
      }
    } else {
      currentWord += s[i];
    }
  }

  if (currentWord.length) words.push(currentWord);

  return words.reverse().join(" ");
};

// const s = "the sky is blue";
const s = "  hello world  ";

console.log(reverseWords(s));
