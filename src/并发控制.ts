// @ts-nocheck
class Scheduler {
  tasks = [];
  limit = 0;
  running = 0;
  curIndex = 0;

  constructor(limit) {
    this.limit = limit;
  }

  add(fn) {
    return new Promise((resolve) => {
      this.tasks.push(async () => {
        await fn();
        resolve();
      });

      this.runNext();
    });
  }

  runNext() {
    if (this.tasks.length === 0) {
      return;
    }

    while (this.running < this.limit && this.curIndex < this.tasks.length) {
      const fn = this.tasks[this.curIndex];

      this.curIndex++;
      this.running++;

      fn()
        .finally(() => {
          this.running--;

          this.runNext();
        })
    }
  }
}

const delay = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => delay(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// output: 2 3 1 4
