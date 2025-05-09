
// instanceof 判断一个构造函数的 prototype 是否出现在另一个对象的原型上
export const instanceOf = <T>(o1: unknown, o2: new () => T) => {
  // 返回 o1 对象的 __proto__, 也就是 创建 o1 对象构造函数的 prototype
  let proto = Object.getPrototypeOf(o1);
  const prototype = o2.prototype;

  while (proto) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

export class A {} 
const a = new A();

console.log(instanceOf(a, A));


export { }
