/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = function (words, maxWidth) {
  const result = [];

  let currentLineWords = [];
  const linesWords = [];
  let currentLineWordsCharsLength = 0;
  let i = 0;

  while (i < words.length) {
    currentLineWordsCharsLength += words[i].length;

    if (currentLineWordsCharsLength + currentLineWords.length <= maxWidth) {
      currentLineWords.push(words[i]);
      i++;
    } else {
      linesWords.push(currentLineWords);
      currentLineWords = [];
      currentLineWordsCharsLength = 0;
    }
  }

  for (let line = 0; line < linesWords.length; line++) {
    let currentLineCharsLength = 0;

    for (const word of linesWords[line]) {
      currentLineCharsLength += word.length;
    }

    currentLineCharsLength += line.length - 1;

    let extraSpacesCount = maxWidth - currentLineCharsLength;
    let i = 0;

    if (line === linesWords.length - 1) {
      const lineLastWordIndex = linesWords[line].length - 1;
      linesWords[line][lineLastWordIndex] += " ".repeat(extraSpacesCount);
    } else {
      while (extraSpacesCount > 0) {
        if (i === 0 && extraSpacesCount < linesWords[line].length - 1) {
          linesWords[line][0] += " ".repeat(extraSpacesCount);
          extraSpacesCount = 0;
        }
        linesWords[line][i] += " ";
        extraSpacesCount--;
        if (i + 1 === linesWords[line].length - 1) {
          i = 0;
        } else {
          i++;
        }
      }
    }

    linesWords[line] = linesWords[line].join(" ");
  }

  return linesWords;
};

const words = ["This", "is", "an", "example", "of", "text", "justification."];

const maxWidth = 16;

console.log(fullJustify(words, maxWidth));
