/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  const result = [];

  let currentLineWords = [];
  let currentLineWordsLength = 0;
  let i = 0;

  while (i < words.length) {
    currentLineWordsCharsLength += words[i].length;
    const currentLineMinSpacesQty = currentLineWords.length - 1;

    if (currentLineWordsCharsLength + currentLineMinSpacesQty <= maxWidth) {
      currentLineWords.push(word);
      i++;
    } else {
      // do smth with gathered words so far

      currentLineWords = [];
      currentLineWordsCharsLength = 0;
    }
  }
};
