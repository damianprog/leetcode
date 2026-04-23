/**
 * @param {string} s
 * @return {string}
 */

// const isLetter = (char) => /^[a-zA-Z]$/.test(char);

// var decodeString = function (s) {
//   let result = "";

//   let i = 0;

//   while (i < s.length) {
//     if (isLetter(s[i])) {
//       result += s[i];
//       i++;
//     } else {
//       let numberString = "";

//       while (s[i] !== "[") {
//         numberString += s[i];
//         i++;
//       }

//       i++;

//       const times = Number(numberString);

//       let openedBrackets = 0;
//       let toDecipher = "";
//       let isOnCipher = true;

//       while (isOnCipher) {
//         if (s[i] === "]" && openedBrackets === 0) {
//           isOnCipher = false;
//         } else {
//           if (s[i] === "[") {
//             openedBrackets++;
//           } else if (s[i] === "]") {
//             openedBrackets--;
//           }

//           toDecipher += s[i];
//         }

//         i++;
//       }

//       result += decodeString(toDecipher).repeat(times);
//     }
//   }

//   return result;
// };

// ==========================================================================
// Lepsza wersja rekurencyjna

// var decodeString = function (s) {
//   let i = 0;

//   function decode() {
//     let result = "";

//     while (i < s.length && s[i] !== "]") {
//       if (s[i] >= "0" && s[i] <= "9") {
//         let times = 0;

//         while (s[i] >= "0" && s[i] <= "9") {
//           times = times * 10 + Number(s[i]);
//           i++;
//         }

//         i++; // skip '['
//         const decodedPart = decode();
//         i++; // skip ']'

//         result += decodedPart.repeat(times);
//       } else {
//         result += s[i];
//         i++;
//       }
//     }

//     return result;
//   }

//   return decode();
// };

// ==========================================================================
// Wersja stosowa

var decodeString = function (s) {
  const countStack = [];
  const stringStack = [];

  let currentString = "";
  let currentNum = 0;

  for (const char of s) {
    if (char >= "0" && char <= "9") {
      currentNum = currentNum * 10 + Number(char);
    } else if (char === "[") {
      countStack.push(currentNum);
      stringStack.push(currentString);

      currentNum = 0;
      currentString = "";
    } else if (char === "]") {
      const repeatTimes = countStack.pop();
      const previousString = stringStack.pop();

      currentString = previousString + currentString.repeat(repeatTimes);
    } else {
      currentString += char;
    }
  }

  return currentString;
};

// ==========================================================================
