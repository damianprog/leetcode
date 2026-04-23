/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const occurencesMap = new Map();

  for (const num of arr) {
    occurencesMap.set(num, (occurencesMap.get(num) || 0) + 1);
  }

  return (
    [...occurencesMap.values()].length === new Set(occurencesMap.values()).size
  );
};
