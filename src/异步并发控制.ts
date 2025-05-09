// @ts-nocheck

/**
 * 限制异步任务的并发数量
 * @param {number} count - 最大并发任务数
 * @param {Array} array - 任务数组
 * @param {Function} iterateFunc - 处理每个任务的函数
 * @returns {Promise} - 当所有任务完成时解析的 Promise
 */
function limit(count, array, iterateFunc) {
  // 所有任务
  const allTasks = [];
  // 执行中 任务
  const activeTasks = [];
  // 当前处理的任务索引
  let currentIndex = 0;

  /**
   * 入队任务
   */
  async function enqueue() {
    // 所有任务处理完
    if (currentIndex === array.length) {
      return Promise.resolve();
    }

    // 获取当前任务
    const currentTask = Promise.resolve().then(() => iterateFunc(array[currentIndex++]));
    // 将当前任务添加到所有任务列表中
    allTasks.push(currentTask);

    // 在当前任务的后面加点逻辑，执行完毕时，从执行中任务队列 中移除任务
    const taskCompletion = currentTask.then(() => {
      const index = activeTasks.indexOf(taskCompletion);
      if (index !== -1) {
        activeTasks.splice(index, 1);
      }
    });
    // 将当前任务添加到执行中任务列表中
    activeTasks.push(taskCompletion);

    // 如果正在执行的任务数量达到最大并发数，在最前执行完毕的任务后加点逻辑：再执行 enqueue
    const waitForTask = activeTasks.length >= count ? Promise.race(activeTasks) : Promise.resolve();

    // 递归调用 enqueue 继续处理下一个任务
    return waitForTask.then(enqueue);
  }

  // 开始入队任务，并在所有任务完成后返回结果
  return enqueue()
    // 为了统一返回全体结果，此时 allTasks 都已经执行完毕了
    .then(() => {
      return Promise.all(allTasks)
    });
}

// ----------------------

// 模拟请求的函数
const mockRequest = (id) => {
  return new Promise((resolve) => {
    console.log(`开始请求 ${id}`);
    setTimeout(() => {
      console.log(`请求 ${id} 完成`);
      resolve(id);
    }, Math.random() * 1000);
  });
};

// 生成 100 个请求的任务数组
const requests = Array.from({ length: 100 }, (_, i) => i + 1);

// 调用 limit 函数控制并发，最多同时执行 5 个请求
limit(5, requests, mockRequest)
  .then((res) => {
    console.log('所有请求完成，结果:', res);
  })
  .catch((error) => {
    console.error('请求执行出错:', error);
  });

