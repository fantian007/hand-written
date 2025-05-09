// @ts-nocheck

// 不能用箭头函数，否则 this 绑定不上
function reduce(f, init) {
  let r = init;
  const arr = this;

  while (arr.length) {
    r = f(r, arr.shift());
  }

  return r;
}

console.log(
  reduce.bind([1, 2, 3])((a, b) => a + b, 0)
);



export { }
