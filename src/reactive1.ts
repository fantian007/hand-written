// @ts-nocheck
function reactive(o) {
  // 边界判断，也是递归终止条件
  if (o === null || typeof o !== 'object') {
    return o;
  }

  for (const k in o) {
    if (o.hasOwnProperty(k)) {
      // 要有个额外的变量来存储 对象的 value
      let v = o[k];

      // 值是对象，那么将值转为 reative 对象
      if (typeof v === 'object') {
        v = reactive(v);
      }

      Object.defineProperty(o, k, {
        // 额外的这2个属性也要写上
        enumerable: true,
        configurable: true,
        // get 一定要写，否则取值为空
        get() {
          return v;
        },
        set(newV) {
          if (v === newV) return;

          // 将新值也转为 reactive 对象
          if (typeof newV === 'object' && newV !== null) {
            newV = reactive(newV);
          }

          // 注意这句
          v = newV;
          // 不能按下列的写，死循环
          // o[k] = newV;

          console.log(`属性值 ${k} 发生了变化: ${newV}`);
        }
      })
    }
  }
}

export { }
