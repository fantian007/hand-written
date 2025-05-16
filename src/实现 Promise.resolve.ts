// @ts-nocheck
Promise.prototype.resolve = (value) => {
  if (value instanceof Promise) {
    return value;
  }

  return new Promise(resolve => {
    resolve(value);
  })
}

export { }
