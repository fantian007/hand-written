setTimeout(function onTimeout() {
  console.log("timeout");

  requestIdleCallback(function onIdle2() {
    console.log("idle2");
  });
}, 0);

Promise.resolve().then(function onFulfill1() {
  console.log("promise1");
});

requestAnimationFrame(function onAf() {
  console.log("raf");

  Promise.resolve().then(function onFulfill2() {
    console.log("promise2");
  });
});

requestIdleCallback(function onIdle1() {
  console.log("idle1");
});


// ------
// promise1
// raf
// promise2
// timeout
// idle1
// idle2

// ------
// 1. requestAnimationFrame 是 16.7ms 执行一次，是在渲染前执行，但是要等所有微任务清空。优先级高于宏任务，低于微任务。
// 2. requestIdleCallback 在渲染后执行，优先级最低，浏览器空闲时间执行，可能被延迟到下一帧或更晚
// 3. 宏任务要等之前的微任务清空，再执行。setTimeout 属于宏任务，在渲染后执行。
// 4. 微任务在同步代码执行完毕后立刻执行，优先级高于 宏任务、渲染操作