// @ts-nocheck

Function.prototype.apply1 = (ctx, args) => {
  const fn = Symbol();

  ctx[fn] = this;
  const r = ctx[fn](...args);

  // 删除新增的属性，不然会越来越多
  delete ctx[fn];
  
  return r;
}
