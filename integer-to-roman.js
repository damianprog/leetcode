/**
 * @param {number} num
 * @return {string}
 */

// const integer = {
//     1: "I",
//     5: "V",
//     10: "X",
//     50: "L",
//     100: "C",
//     500: "D",
//     1000: "M",
// };

// const subtractiveForms = {
//     v4c1: "IV",
//     v4c2: "XL",
//     v4c3: "CD",
//     v9c1: "IX",
//     v9c2: "XC",
//     v9c3: "CM",
// };

// const getMaxPossibleSubtractValue = (input) => {
//     const values = Object.keys(integer);

//     for (let i = values.length - 1; i >= 0; i--) {
//         if (input - Number(values[i]) >= 0) return Number(values[i]);
//     }
// };

// var intToRoman = function (num) {
//     let result = "";

//     let input = num;

//     while (input > 0) {
//         const inputString = input.toString();
//         if (inputString[0] === "4" || inputString[0] === "9") {
//             result += subtractiveForms[`v${inputString[0]}c${inputString.length}`];
//             input -= Number(
//                 `${inputString[0]}${"0".repeat(inputString.length - 1)}`,
//             );
//         } else {
//             const maxPossibleSubtractValue = getMaxPossibleSubtractValue(input);
//             result += integer[maxPossibleSubtractValue];
//             input -= maxPossibleSubtractValue;
//         }
//     }

//     return result;
// };

// =========================================================================================
// Subtractive forms również w integer

// const integer = {
//   1: "I",
//   4: "IV",
//   5: "V",
//   9: "IX",
//   10: "X",
//   40: "XL",
//   50: "L",
//   90: "XC",
//   100: "C",
//   400: "CD",
//   500: "D",
//   900: "CM",
//   1000: "M",
// };

// const getMaxPossibleSubtractValue = (input) => {
//   const values = Object.keys(integer);

//   for (let i = values.length - 1; i >= 0; i--) {
//     if (input - Number(values[i]) >= 0) return Number(values[i]);
//   }
// };

// var intToRoman = function (num) {
//   let result = "";

//   let input = num;

//   while (input > 0) {
//     const maxPossibleSubtractValue = getMaxPossibleSubtractValue(input);
//     result += integer[maxPossibleSubtractValue];
//     input -= maxPossibleSubtractValue;
//   }

//   return result;
// };

// =========================================================================================
// Wersja idiomatyczna

const intToRoman = function (num) {
  const map = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, symbol] of map) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
};
