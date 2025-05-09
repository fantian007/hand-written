const promiseAll = <T>(promises: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    const t: T[] = [];
    let count = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, i) => {
      promise.then(r => {
        t[i] = r;
        count++;

        if (count === promises.length) {
          resolve(t);
        }
      }).catch(e => {
        reject(e);
      })
    });
  })
}

export { }