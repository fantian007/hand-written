// @ts-nocheck
Function.prototype.bind = function (context, ...args) {
  const fn = this;

  return (...args2) => {
    return fn.apply(ctx, [...args, ...args2]);
  }
}
// 示例
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}
const person = { name: 'Alice' };
const boundGreet = greet.bind(person, 'Hello');
boundGreet('!'); // 输出: Hello, Alice!
// 这里的 this 指向 person 对象
// 传入的参数是 'Hello' 和 '!'，所以输出结果是 'Hello, Alice!'