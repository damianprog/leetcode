/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
// const fullJustify = function (words, maxWidth) {
//   const result = [];

//   let currentLineWords = [];
//   const linesWords = [];
//   let currentLineWordsCharsLength = 0;
//   let i = 0;

//   while (i < words.length) {
//     currentLineWordsCharsLength += words[i].length;

//     // currentLineWords.length bez -1 bo currentLineWords nie zawiera jeszcze word
//     // którym się obecnie zajmujemy.
//     if (currentLineWordsCharsLength + currentLineWords.length <= maxWidth) {
//       currentLineWords.push(words[i]);
//       i++;
//     } else {
//       linesWords.push(currentLineWords);
//       currentLineWords = [];
//       currentLineWordsCharsLength = 0;
//     }
//   }

//   if (currentLineWords.length > 0) {
//     linesWords.push(currentLineWords);
//   }

//   for (let line = 0; line < linesWords.length; line++) {
//     let currentLineCharsLength = 0;

//     for (const word of linesWords[line]) {
//       currentLineCharsLength += word.length;
//     }

//     currentLineCharsLength += linesWords[line].length - 1;

//     let extraSpacesCount = maxWidth - currentLineCharsLength;

//     let i = 0;

//     if (line === linesWords.length - 1) {
//       const lineLastWordIndex = linesWords[line].length - 1;
//       linesWords[line][lineLastWordIndex] += " ".repeat(extraSpacesCount);
//     } else {
//       while (extraSpacesCount > 0) {
//         linesWords[line][i] += " ";
//         extraSpacesCount--;

//         i = i + 1 >= linesWords[line].length - 1 ? 0 : i + 1;
//       }
//     }

//     linesWords[line] = linesWords[line].join(" ");
//   }

//   return linesWords;
// };

const fullJustify = function (words, maxWidth) {
  const res = [];
  let line = [];
  let len = 0; // suma znaków słów w bieżącej linii (bez spacji)

  for (const word of words) {
    if (len + line.length + word.length > maxWidth) {
      res.push(justify(line, len, maxWidth));
      line = [];
      len = 0;
    }
    line.push(word);
    len += word.length;
  }

  // last line: zawsze left-justified
  res.push(line.join(" ").padEnd(maxWidth));
  return res;
};

function justify(line, len, maxWidth) {
  if (line.length === 1) return line[0].padEnd(maxWidth); // single word
  const gaps = line.length - 1;
  const total = maxWidth - len;
  const base = Math.floor(total / gaps);
  const extra = total % gaps;

  let out = "";
  for (let i = 0; i < line.length; i++) {
    out += line[i];
    if (i < gaps) out += " ".repeat(base + (i < extra ? 1 : 0));
  }
  return out;
}

const words = [
  "Science",
  "is",
  "what",
  "we",
  "understand",
  "well",
  "enough",
  "to",
  "explain",
  "to",
  "a",
  "computer.",
  "Art",
  "is",
  "everything",
  "else",
  "we",
  "do",
];

const maxWidth = 20;

console.log(fullJustify(words, maxWidth));
