/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function (s) {
  //   const sArray = Array.from(s);
  //   let toElim = 0;

  //   for (let i = s.length - 1; i >= 0; i--) {
  //     if (s[i] === "*") toElim++;

  //     if (s[i] !== "*" && toElim > 0) {
  //       sArray[i] = "*";
  //       toElim--;
  //     }
  //   }

  //   let result = "";

  //   for (const char of sArray) {
  //     if (char !== "*") result += char;
  //   }

  //   return result;

  // ===================================================================
  // Najprostsze rozwiązanie: Stack

  //   const stack = [];

  //   for (const char of s) {
  //     if (char === "*") {
  //       stack.pop();
  //     } else {
  //       stack.push(char);
  //     }
  //   }

  //   return stack.join("");

  // ===================================================================
  // Przejście od końca ale bez nadpisywania sArray

  const result = [];
  let toRemove = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "*") {
      toRemove++;
    } else if (toRemove > 0) {
      toRemove--;
    } else {
      result.push(s[i]);
    }
  }

  return result.reverse().join("");

  // ===================================================================
};

// const s = "leet**cod*e";
const s = "erase*****";

console.log(removeStars(s));
