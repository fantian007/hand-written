// 方式一
function swap (a: number, b: number) {
  [a, b] = [b, a];
}

// 方式二
function swap2 (a: number, b: number) {
  a = a + b;
  b = a - b;
  a = a - b;
}
