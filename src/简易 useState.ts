// @ts-nocheck
// @see https://github.com/sisterAn/blog/issues/130

let memorizedValue;
// 单个
const useState = (initValue) => {
  memorizedValue ??= memorizedValue;

  const setState = (v) => {
    memorizedValue = v;
    // 模拟
    // render();
  }

  return [memorizedValue, setState];
}

// --------
// 多个
const states = [];
let index = 0;

const useState2 = (initValue) => {
  let current = index;

  states[current] ??= initValue;

  const setState = (v) => {
    states[current] = v;

    // 模拟
    // render()
  }

  index++;

  return [states[current], setState];
}
