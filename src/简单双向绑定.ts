// @ts-nocheck

const div = document.createElement('div');
const obj = {};
let value;

Object.defineProperty(obj, 'text', {
  get() {
    return value;
  },
  set(v) {
    value = v;

    // 数据变更，更新 DOM
    div.innerHTML = v;
  }
});

div.addEventListener('click', () => {
  // DOM 事件触发，更新对象属性值
  obj.text = 'A';
});

export {}
