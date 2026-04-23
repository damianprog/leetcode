/**
 * @param {character[]} chars
 * @return {number}
 */
// var compress = function (chars) {
//   if (chars.length === 1) return 1;

//   let stringLastCharIndex = 0;
//   let quantity = 1;

//   for (let i = 1; i < chars.length; i++) {
//     if (chars[i] === chars[stringLastCharIndex]) {
//       quantity++;
//     }

//     if (chars[i] !== chars[stringLastCharIndex] || i === chars.length - 1) {
//       if (quantity > 1) {
//         const quantityChars = quantity.toString().split("");
//         chars.splice(
//           stringLastCharIndex + 1,
//           quantityChars.length,
//           ...quantityChars,
//         );
//         stringLastCharIndex = stringLastCharIndex + quantityChars.length + 1;
//         quantity = 1;
//       } else {
//         stringLastCharIndex++;
//       }

//       if (stringLastCharIndex < chars.length)
//         chars[stringLastCharIndex] = chars[i];
//     }
//   }

//   return stringLastCharIndex;
// };

// ==============================================================================
// Moje poprawione

// var compress = function (chars) {
//   if (chars.length === 1) return 1;

//   let stringLastCharIndex = 0;
//   let quantity = 1;

//   for (let i = 1; i <= chars.length; i++) {
//     if (i < chars.length && chars[i] === chars[i - 1]) {
//       quantity++;
//     } else {
//       chars[stringLastCharIndex] = chars[i - 1];
//       stringLastCharIndex++;

//       if (quantity > 1) {
//         const quantityChars = quantity.toString().split("");

//         for (const char of quantityChars) {
//           chars[stringLastCharIndex] = char;
//           stringLastCharIndex++;
//         }
//       }

//       quantity = 1;
//     }
//   }

//   return stringLastCharIndex;
// };

// ==============================================================================

var compress = function (chars) {
  let write = 0;
  let read = 0;

  while (read < chars.length) {
    const currentChar = chars[read];
    let count = 0;

    while (read < chars.length && chars[read] === currentChar) {
      read++;
      count++;
    }

    chars[write] = currentChar;
    write++;

    if (count > 1) {
      const countChars = String(count);

      for (const digit of countChars) {
        chars[write] = digit;
        write++;
      }
    }
  }

  return write;
};

// const chars = ["a", "a", "b", "b", "c", "c", "c"];
// const chars = ["a"];
// const chars = ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"];
// const chars = ["a", "a"];
const chars = ["a", "b", "c"];

console.log(compress(chars));
