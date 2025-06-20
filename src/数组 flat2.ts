// @ts-nocheck

Array.prototype.flat = function (depth = 1) {
  // 注意要 slice 克隆
  if (depth < 1) return this.slice();

  return this.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc.concat(cur.flat(depth - 1));
    } else {
      return acc.concat(cur);
    }
  }, []);
}

// ----

console.log([1, [2], 3, [4, [5]]].flat());
// console.log([1, [2, [3]]].flat());

export { }
