// @ts-nocheck


/**
 * 使用 栈+迭代 替代 递归
 * 
 * 原理：
 * 1. 使用栈模拟函数调用栈，只不过 调用栈会增加深度，模拟栈只增加长度
 * 
 */

Array.prototype.flat = function (depth = 1) {
  const r = [];
  const stack = this.map(m => ({ depth: 1, value: m }));

  while (stack.length) {
    const { value, depth: _depth } = stack.pop();

    if (Array.isArray(value) && _depth <= depth) {
      stack.push(...value.map(m => ({ depth: _depth + 1, value: m })));
    } else {
      r.unshift(value);
    }
  }

  return r;
};


// 公式：
// while (stack.length > 0) {
//   const frame = stack.pop(); // 弹栈
//   if (frame.n === 0) {
//     // 基准条件，计算结果
//   } else {
//     // 生成子问题，压栈
//     stack.push({ n: frame.n - 1, value: xxx });
//   }
// }

// 豆包：
// https://www.doubao.com/thread/w5bea8097f01b9f50

// ----

console.log([1, [2], 3, [4, [5]]].flat());

export { }
