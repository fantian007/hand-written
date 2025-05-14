// @ts-nocheck

// 不能用箭头函数，否则 this 绑定不上
function reduce(f, init) {
  const arr = this;

  while (arr.length) {
    init = f(r, arr.shift());
  }

  return init;
}

console.log(
  reduce.bind([1, 2, 3])((a, b) => a + b, 0)
);

export { }
