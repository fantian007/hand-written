// @ts-nocheck

// 宏任务包括整体的 script 代码块、setTimeout、setInterval、I/O 操作、UI 渲染等。
// 微任务包括 Promise 的回调、MutationObserver 的回调、process.nextTick（在 Node.js 环境中）等。

async function async1() {
  console.log("async1 start");
  // await 后面的语句 是立即执行的
  await async2();
  // await 的后面会放入微任务
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("js start");

setTimeout(function () {
  console.log("timeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise");
  resolve();
}).then(function () {
  console.log("then");
});

console.log("js end");

// -------------
// "js start"
// "async1 start"
// "async2
// "promise"
// "js end"
// "async1 end"
// "then"
// "timeout"
