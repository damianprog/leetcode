var RandomizedSet = function () {
  this.set = new Set();
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (!this.set.has(val)) {
    this.set.add(val);
    return true;
  } else {
    return false;
  }
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (this.set.has(val)) {
    this.set.delete(val);
    return true;
  } else {
    return false;
  }
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  let randomIndex = Math.floor(Math.random() * this.set.size);

  let i = 0;

  for (const item of this.set) {
    if (i === randomIndex) return item;

    i++;
  }
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
