// @ts-nocheck

function limitConcurrency(requests, concurrency) {
  let index = 0;
  let inProgress = 0;
  let completed = 0;

  return new Promise((resolve) => {
    function runNext() {
      if (index >= requests.length && inProgress === 0) {
        resolve();
        return;
      }

      while (inProgress < concurrency && index < requests.length) {
        const request = requests[index];
        index++;
        inProgress++;

        request()
          .then(() => {
            completed++;
            inProgress--;
            runNext();
          })
          .catch(() => {
            completed++;
            inProgress--;
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