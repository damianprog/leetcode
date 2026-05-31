/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  //   let currentHIndex = 0;
  //   while (true) {
  //     if (currentHIndex <= citations.length) {
  //       let validArticles = 0;
  //       for (const num of citations) {
  //         if (num >= currentHIndex) validArticles++;
  //         if (validArticles >= currentHIndex) {
  //           break;
  //         }
  //       }
  //       if (validArticles >= currentHIndex) {
  //         currentHIndex++;
  //       } else {
  //         return currentHIndex - 1;
  //       }
  //     } else {
  //       return currentHIndex - 1;
  //     }
  //   }
  // ==================================================================================
  // Ta sama logika, czytelniej
  //   for (let h = citations.length; h >= 0; h--) {
  //     let count = 0;
  //     for (const c of citations) if (c >= h) count++;
  //     if (count >= h) return h;
  //   }
  // ==================================================================================
  // Lepsze podejście Sort
  // citations.sort((a, b) => b - a);
  // let k = 0;
  // while (k < citations.length) {
  //   if (citations[k] < k + 1) return k;
  //   k++;
  // }
  // return k;
  // ==================================================================================
  // Bucket
  // ==================================================================================
};
