// @ts-nocheck

// 把函数放到新对象里，执行
Function.prototype.call1 = function () {
  const ctx = arguments[0];
  const args = Array.prototype.slice.call(arguments, 1);

  const fn = Symbol();

  ctx[fn] = this;

  const r = ctx[fn](args);

  delete ctx[fn];

  return r;
}

// --------------
// 测试
const a = {
  name: 'A',
  getName() {
    return this.name;
  }
};

console.log(
  a.getName.call1({ name: 'B' })
);

export { };
