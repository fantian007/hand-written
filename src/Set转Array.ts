const s = new Set();
// 1.
Array.from(s);
// 2.
[...s]
// 3.
Array.prototype.slice.call(s);
