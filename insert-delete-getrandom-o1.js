var RandomizedSet = function () {
  this.array = [];
  this.map = new Map();
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (!this.map.has(val)) {
    if (this.map.size < this.array.length) {
      this.array[this.map.size] = val;
      this.map.set(val, this.map.size);
    } else {
      this.array.push(val);
      this.map.set(val, this.array.length - 1);
    }

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
  if (this.map.has(val)) {
    const index = this.map.get(val);

    this.map.set(this.array[this.map.size - 1], index);

    [this.array[index], this.array[this.map.size - 1]] = [
      this.array[this.map.size - 1],
      this.array[index],
    ];

    this.map.delete(val);
    return true;
  } else {
    return false;
  }
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const randomIndex = Math.floor(Math.random() * this.map.size);

  return this.array[randomIndex];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
