// @ts-nocheck
Promise.prototype.finally = function (cb) {
  return this.then(value => {
    return Promise.resolve(cb()).then(() => {
      return value;
    });
  }, e => {
    // 为什么不用 Promise.reject(cb()).catch(e => throw e) ?
    // Promise.reject 会立即拒绝，不执行 cb()
    return Promise.resolve(cb()).then(() => {
      throw e;
    });
  })
}

export { }
