// @ts-nocheck

Object.prototype.is1 = (x: any, y: any) => {
  if (Number.isNaN(x) && Number.isNaN(y)) return true;

  if (x === 0 && y === 0) return 1 / x === 1 / y; // Infinity 和 -Infinity

  return x === y;
}

console.log(Object.is1(NaN, NaN)); // true
console.log(Object.is1(+0, -0)); // false
console.log(+0 === -0); // true

export { }
