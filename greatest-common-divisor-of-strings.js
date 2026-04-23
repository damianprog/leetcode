/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  //   for (let i = 0; i < str2.length; i++) {
  //     const sub = str2.substring(0, str2.length - i);
  //     const count1 = (str1.match(new RegExp(sub, "g")) || []).length;
  //     const count2 = (str2.match(new RegExp(sub, "g")) || []).length;

  //     if (
  //       count1 * sub.length === str1.length &&
  //       count2 * sub.length === str2.length
  //     ) {
  //       return sub;
  //     }
  //   }

  //   return "";

  // ==============================================================
  // Najlepsze rozwiązanie

  if (str1 + str2 !== str2 + str1) return "";

  const gcd = (a, b) => {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  return str1.slice(0, gcd(str1.length, str2.length));
};
