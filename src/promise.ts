// @ts-nocheck

// 定义 Promise 的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class SimplePromise {
  constructor(executor) {
    // 初始状态为 pending
    this.status = PENDING;
    // 存储成功的值
    this.value = undefined;
    // 存储失败的原因
    this.reason = undefined;
    // 存储成功的回调函数
    this.onFulfilledCallbacks = [];
    // 存储失败的回调函数
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次执行成功的回调函数
        this.onFulfilledCallbacks.forEach((callback) => callback());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次执行失败的回调函数
        this.onRejectedCallbacks.forEach((callback) => callback());
      }
    };

    try {
      // 执行 executor 函数
      executor(resolve, reject);
    } catch (error) {
      // 如果 executor 函数抛出错误，调用 reject 方法
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 如果 onFulfilled 不是函数，将其转换为一个返回值的函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // 如果 onRejected 不是函数，将其转换为一个抛出错误的函数
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

    const newPromise = new SimplePromise((resolve, reject) => {
      const handleFulfilled = () => {
        try {
          const result = onFulfilled(this.value);
          // 如果 result 是一个 Promise，等待其状态变更
          if (result instanceof SimplePromise) {
            result.then(resolve, reject);
          } else {
            // 否则，直接 resolve 结果
            resolve(result);
          }
        } catch (error) {
          // 如果执行 onFulfilled 时抛出错误，reject 错误
          reject(error);
        }
      };

      const handleRejected = () => {
        try {
          const result = onRejected(this.reason);
          // 如果 result 是一个 Promise，等待其状态变更
          if (result instanceof SimplePromise) {
            result.then(resolve, reject);
          } else {
            // 否则，直接 resolve 结果
            resolve(result);
          }
        } catch (error) {
          // 如果执行 onRejected 时抛出错误，reject 错误
          reject(error);
        }
      };

      if (this.status === FULFILLED) {
        // 如果状态已经是 fulfilled，立即执行 handleFulfilled 函数
        setTimeout(handleFulfilled, 0);
      } else if (this.status === REJECTED) {
        // 如果状态已经是 rejected，立即执行 handleRejected 函数
        setTimeout(handleRejected, 0);
      } else if (this.status === PENDING) {
        // 如果状态还是 pending，将 handleFulfilled 和 handleRejected 函数添加到回调数组中
        this.onFulfilledCallbacks.push(() => setTimeout(handleFulfilled, 0));
        this.onRejectedCallbacks.push(() => setTimeout(handleRejected, 0));
      }
    });

    return newPromise;
  }
}

// ------------

// 使用示例
const promise = new SimplePromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  }, 1000);
});

promise.then((value) => {
  console.log(value);
  return new SimplePromise((resolve) => {
    setTimeout(() => {
      resolve('链式调用成功');
    }, 1000);
  });
}).then((value) => {
  console.log(value);
});
