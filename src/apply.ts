// @ts-nocheck

// 注意：不能用箭头函数，否则 this 指向全局
Function.prototype.apply1 = function (ctx, args) {
  const fn = Symbol();

  ctx[fn] = this;
  const r = ctx[fn](...args);

  // 删除新增的属性，不然会越来越多
  delete ctx[fn];

  return r;
}

// -----

const a = { name: 'A' };
const fn = function (p1, p2) {
  console.log(this.name, p1, p2);
}

fn.apply1(a, [1, 2]);

