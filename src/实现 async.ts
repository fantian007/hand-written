// @ts-nocheck
const myAsync = function (generatorFn) {
  const gen = generatorFn.apply(this, arguments);

  return function () {
    return new Promise((resolve, reject) => {
      function step(key, args?) {
        let r;

        try {
          r = gen[key](args);
        } catch (error) {
          reject(error);
        }

        const { done, value } = r;

        if (done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(
            v => step('next', v),
            e => step('throw', e)
          )
        }
      }

      step('next');
    });
  }
}

// ----

function fetch() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('fetch data');
    }, 1e3);
  })
}

const asyncFn = myAsync(function* () {
  const data = yield fetch();
  console.log(data);
  return 'done';
});

asyncFn().then(res => {
  console.log(res);
});
