// @ts-nocheck
Promise.prototype.finally = function (cb) {
  const promise = this;

  return promise.then(value => {
    return Promise.resolve(cb()).then(() => {
      return value;
    });
  }, e => {
    // 为什么不用 Promise.reject(cb()).catch(e => throw e) ?
    return Promise.resolve(cb()).then(() => {
      throw e;
    });
  })
}

export { }
