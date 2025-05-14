const serialAsyncTasks = (tasks: Promise<void>[]) => {
  return tasks.reduce((prev, cur) => {
    return prev.then(() => cur);
  },
    // 初始值
    Promise.resolve()
  );
}

export { }
