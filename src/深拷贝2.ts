
// @ts-nocheck
export const checkType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);

// 循环引用、其它对象类型、拷贝不可枚举 + Symbol 属性
export const cloneDeep = (obj: any, visited = new WeakMap()) => {
  if (typeof obj !== 'object' || obj === null) return obj;

  // 循环引用
  if (visited.has(obj)) return visited.get(obj);

  let r;
  const type = checkType(obj);

  if (type === 'Object') {
    r = {};
  }
  else if (type === 'Array') {
    r = [];
  }
  else if (type === 'Date') {
    r = new Date(obj.getTime());
  }
  else if (type === 'RegExp') {
    r = new RegExp(obj);
  }
  else if (type === 'Map') {
    r = new Map();

    obj.forEach((v, k) => {
      r.set(k, cloneDeep(v, visited));
    });
  }
  else if (type === 'Set') {
    r = new Set();

    obj.forEach((v, k) => {
      r.add(cloneDeep(v, visited));
    });
  }
  else {
    return obj;
  }

  visited.set(obj, r);

  const allObjKeys = [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
  
  allObjKeys.forEach(k => {
    const desc = Object.getOwnPropertyDescriptor(obj, k);

    if (desc) {
      // 手动设置了 setter, getter，直接复制行为，不递归处理值了
      if (desc.get || desc.set) {
        Object.defineProperty(r, k, desc);
      } else {
        r[k] = cloneDeep(obj[k], visited);
      }
    }
  });

  return r;
}

const a = { id: 1, name: 'A', c: { id: 2 } };
const b = cloneDeep(a);
b.name = 'B';
a.c.id = 3;
console.log(b.c.id, b.name);


export { }
