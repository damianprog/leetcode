/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  //   let frontPointer = 0;
  //   let backPointer = s.length - 1;
  //   const sArray = Array.from(s);

  //   const vowels = new Set(["a", "e", "i", "o", "u"]);

  //   while (frontPointer < backPointer) {
  //     if (
  //       vowels.has(sArray[frontPointer].toLowerCase()) &&
  //       vowels.has(sArray[backPointer].toLowerCase())
  //     ) {
  //       const prevFront = sArray[frontPointer];
  //       sArray[frontPointer] = sArray[backPointer];
  //       sArray[backPointer] = prevFront;
  //       frontPointer++;
  //       backPointer--;
  //     }

  //     if (!vowels.has(sArray[frontPointer].toLowerCase())) frontPointer++;
  //     if (!vowels.has(sArray[backPointer].toLowerCase())) backPointer--;
  //   }

  //   return sArray.join("");

  // ==========================================================================
  // Trochę lepsza czytelniejsza wersja

  let left = 0;
  let right = s.length - 1;
  const chars = Array.from(s);
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  const isVowel = (char) => vowels.has(char.toLowerCase());

  while (left < right) {
    if (!isVowel(chars[left])) {
      left++;
      continue;
    }

    if (!isVowel(chars[right])) {
      right--;
      continue;
    }

    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }

  return chars.join("");
};

const s = "IceCreAm";

console.log(reverseVowels(s));
