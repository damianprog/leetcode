// var RecentCounter = function () {
//   this.queue = [];
// };

// /**
//  * @param {number} t
//  * @return {number}
//  */
// RecentCounter.prototype.ping = function (t) {
//   this.queue.push(t);

//   const range = t - 3000;

//   let qty = 0;

//   for (time of this.queue) {
//     if (time >= range) qty++;
//   }

//   return qty;
// };

// =============================================================================
// Lepsza wersja

// var RecentCounter = function () {
//   this.queue = [];
// };

// RecentCounter.prototype.ping = function (t) {
//   this.queue.push(t);

//   while (this.queue[0] < t - 3000) {
//     this.queue.shift();
//   }

//   return this.queue.length;
// };

// =============================================================================
// shift() w zwykłej tablicy jest O(n) bo przesuwa wszystkie elementy
// Lepsza wersja algorytmicznie

var RecentCounter = function () {
  this.queue = [];
  this.left = 0;
};

RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);

  while (this.queue[this.left] < t - 3000) {
    this.left++;
  }

  return this.queue.length - this.left;
};

// =============================================================================
