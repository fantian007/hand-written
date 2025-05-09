const serialAsyncTasks = (tasks: Promise<void>[]) => {
  return tasks.reduce((prev, cur) => {
    return prev.then(() => cur);
  }, Promise.resolve());
}
