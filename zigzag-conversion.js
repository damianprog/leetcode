/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
// test
const convert = function (s, numRows) {
  if (numRows === 1) {
    return s;
  }

  const zigzagRows = new Array(numRows).fill("");

  let pointer = 0;
  let isPointerGrowing = true;

  for (let i = 0; i < s.length; i++) {
    zigzagRows[pointer] = zigzagRows[pointer] + s[i];

    pointer = isPointerGrowing ? pointer + 1 : pointer - 1;
    if (pointer === numRows - 1) {
      isPointerGrowing = false;
    } else if (pointer === 0 && isPointerGrowing === false) {
      isPointerGrowing = true;
    }
  }

  return zigzagRows.join("");
};
