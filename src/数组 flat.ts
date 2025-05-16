// @ts-nocheck

Array.prototype.flat = function (depth = 1) {
  const flat = (arr, depth) => {
    const r = [];

    for (const t of arr) {
      if (Array.isArray(t)) {
        if (depth > 0) {
          r.push(...flat(t, depth - 1));
        } else {
          r.push(t);
        }
      } else {
        r.push(t);
      }
    }

    return r;
  }

  return flat(this, depth);
}

// ----

console.log([1, [2], 3, [4, [5]]].flat());

export {}
