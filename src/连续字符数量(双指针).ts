// @ts-nocheck

// 找出字符串中连续出现最多的字符和个数，请实现以下函数
// 思路：双指针
function findContinuouslyLongest(str: string) {
  const n = str.length;

  let result = {};

  if (n === 0) return result;

  let p1 = 0;
  let p2 = 0;
  // 记录最大长度
  let maxLen = 0;

  while (p2 < n) {
    while (p2 < n && str[p2] === str[p1]) {
      p2++;
    }

    const len = p2 - p1;

    // 大于最大长度，直接覆盖
    if (len > maxLen) {
      maxLen = len;

      result = {
        [str[p1]]: len
      }
    }
    // 等于最大长度，新增
    else if (len === maxLen) {
      result[str[p1]] = len;
    }

    p1 = p2;
  };

  return result;
}

// 调用
const test1 = 'abcaakjbb';
const test2 = 'abbkejsbcccwccqaa';
const test3 = 'abcdef';
console.log(JSON.stringify(findContinuouslyLongest(test1)));
// console.log(JSON.stringify(findContinuouslyLongest(test2)));
// console.log(JSON.stringify(findContinuouslyLongest(test3)));

// 正确结果
// {a: 2, b: 2}
// {c: 3}
// {a: 1, b: 1, c: 1, d: 1, e: 1, f: 1}
