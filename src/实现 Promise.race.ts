export const promiseRace = <T>(promises: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve(undefined);
      return;
    }

    promises.forEach(promise => {
      promise.then(resolve).catch(reject);
    });
  });
}

export { }
