// @ts-nocheck

function promisify(func) {
  // 返回函数，接收参数
  return function (...args) {
    // 返回 promise
    return new Promise((resolve, reject) => {
      // 回调里面 resolve, reject
      const callback = (error, result) => {
        if (error) {
          // 如果有错误，拒绝 Promise
          reject(error);
        } else {
          // 如果没有错误，解决 Promise
          resolve(result);
        }
      };

      // 调用原本函数
      func.call(this, ...args, callback);
    });
  };
}

// -----------

// 示例：一个遵循错误优先回调风格的函数
function readFile(callback) {
  // 模拟异步操作
  setTimeout(() => {
    const success = Math.random() > 0.2;
    if (success) {
      callback(null, '文件内容');
    } else {
      callback(new Error('读取文件失败'), null);
    }
  }, 1000);
}

// 使用 promisify 转换函数
const readFilePromise = promisify(readFile);

// 使用转换后的 Promise 函数
readFilePromise()
  .then((data) => {
    console.log('读取到的文件内容:', data);
  })
  .catch((error) => {
    console.error('读取文件出错:', error);
  });
