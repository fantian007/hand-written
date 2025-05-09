// @ts-nocheck

// 参数不够，一直收集；参数够了，则执行
function curry(fn) {
  return function curried(...args) {
    // 参数够了，立即执行
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // 再返回一个函数用来收集参数
      return (...args1) => {
        return curried.apply(this, args.concat(args1));
      }
    }
  }
}

// 示例函数
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// 分步调用
console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1)(2, 3)); 