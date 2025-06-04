// 不允许二次赋值
function myConst(k, v) {
  if (window.hasOwnProperty(k)) {
    throw new Error(`window.${k} is already defined`)
  }

  Object.defineProperty(window, k, {
    value: v,
    writable: false,
    enumerable: false,
    configurable: false,
    get: function () {
      return v
    },
    set: function (_newValue) {
      throw new TypeError(`Assignment to constant variable.`);
    }
  });
}
