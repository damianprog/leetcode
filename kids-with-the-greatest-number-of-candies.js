/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  //   let greatest = 0;

  //   for (let i = 0; i < candies.length; i++) {
  //     if (candies[i] > greatest) greatest = candies[i];
  //   }

  //   const results = [];

  //   for (let i = 0; i < candies.length; i++) {
  //     results.push(candies[i] + extraCandies >= greatest);
  //   }

  //   return results;

  // Rozwiązanie mniej algorytmiczne ale bardziej javascriptowe

  const maxCandies = Math.max(...candies);
  return candies.map((candy) => candy + extraCandies >= maxCandies);
};
