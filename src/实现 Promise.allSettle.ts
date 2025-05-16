// @ts-nocheck
Promise.prototype.allSettle = (promiseArr: Promise<any>[]) => {
  const n = promiseArr.length;

  if (n === 0) {
    return Promise.resolve([]);
  }

  return new Promise(resolve => {
    const r = new Array(promiseArr.length);
    let complete = 0;

    promiseArr.forEach((p, i) => {
      // 注意：数组元素可能不是 Promise, 需要转为 Promise
      Promise.resolve(p)
        .then(v => {
          r[i] = {
            status: 'fulfilled',
            value: v
          };
        })
        .catch(e => {
          r[i] = {
            status: 'rejected',
            reason: e
          }
        })
        .finally(() => {
          complete++;

          if (complete === promiseArr.length) {
            resolve(r);
          }
        });
    });
  });
}

export { }
