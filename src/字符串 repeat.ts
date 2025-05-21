// @ts-nocheck

// 方式一
String.prototype.repeat1 = function (n) {
  // 数组中各个空元素 使用 字符串 连接
  return new Array(n + 1).join(this);
}

// 方式二
String.prototype.repeat2 = function (n) {
  if (n === 1) return this;

  return this + this.repeat2(n - 1);
}

// ----
console.log('123'.repeat1(3));
console.log('123'.repeat2(3));
