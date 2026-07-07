/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  const result = [];

  let currentLineWords = [];
  const linesWords = [];
  let currentLineWordsLength = 0;
  let i = 0;

  while (i < words.length) {
    currentLineWordsCharsLength += words[i].length;

    if (currentLineWordsCharsLength + currentLineWords.length <= maxWidth) {
      currentLineWords.push(word);
      i++;
    } else {
      linesWords.push(currentLineWords);
      currentLineWords = [];
      currentLineWordsCharsLength = 0;
    }
  }

  for (const line of linesWords) {
    let currentLineCharsLength = 0;

    for (const word of line) {
      currentLineCharsLength += word.length;
    }

    currentLineCharsLength += line.length - 1;

    let extraSpacesCount = maxWidth - currentLineCharsLength;
    let i = 0;

    while (extraSpacesCount > 0) {
      // check this line
      if (i === 0 && extraSpacesCount % line.length !== 0) {
        line[0] += " ".repeat(extraSpacesCount);
        extraSpacesCount = 0;
      }
      line[i] += " ";
      extraSpacesCount--;
      if (i + 1 === line.length) {
        i = 0;
      } else {
        i++;
      }
    }
  }
};
