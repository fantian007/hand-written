// @ts-nocheck

function limitConcurrency(requests, concurrency) {
  let curIndex = 0;
  let running = 0;
  let completed = 0;

  return new Promise((resolve) => {
    function runNext() {
      // if (index >= requests.length && inProgress === 0) {
      if (completed === requests.length) {
        resolve();
        return;
      }

      while (running < concurrency && curIndex < requests.length) {
        const request = requests[curIndex];

        curIndex++;
        running++;

        request()
          .then(() => {
            completed++;
            running--;
            runNext();
          })
          .catch(() => {
            completed++;
            running--;
            runNext();
          });
      }
    }

    runNext();
  });
}

// 模拟请求函数
function createRequest(id) {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Request ${id} completed`);
        resolve();
      }, Math.random() * 1000);
    });
  };
}

// 创建 100 个请求
const requests = Array.from({ length: 100 }, (_, i) => createRequest(i + 1));

// 设置并发数为 10
const concurrency = 10;

// 执行请求
limitConcurrency(requests, concurrency).then(() => {
  console.log('All requests completed');
});