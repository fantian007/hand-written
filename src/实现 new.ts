// @ts-nocheck
function A () {
  this.name = 'A';
}

A.prototype.getName = function() {
  return this.name;
}

// new 过程
const b = {};
A.call(b); // 复制 this 属性
// 复制原型属性
// @ts-ignore
b.__proto__ = A.prototype;

// @ts-ignore
console.log(b.getName());

export {}
