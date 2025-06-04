
// @ts-nocheck
export class EventEmiter {
  events = {};

  on(name, fn) {
    this.events[name] ??= [];

    this.events[name].push(fn);
  }

  off(name, fn) {
    if (this.events[name]) {
      const i = this.events[name].findIndex(f => f === fn);

      if (i >= 0) {
        this.events[name].splice(i, 1);
      }
    }
  }

  emit(name, ...args) {
    const fns = this.events[name];

    if (fns?.length) {
      fns.forEach(fn => {
        fn.apply(this, args);
      });
    }
  }

  once(name, fn) {
    const exec = function (...args) {
      fn.apply(this, args);
      this.off(name, exec);
    }

    this.on(name, exec);
  }
}

// ----
let event = new EventEmiter()

let login1 = function (...args) {
  console.log('login success1', args)
}
let login2 = function (...args) {
  console.log('login success2', args)
}
// event.on('login',login1)
event.once('login', login2)
event.off('login', login1) // 解除订阅
event.emit('login', 1, 2, 3, 4, 5)
event.emit('login', 6, 7, 8, 9)
event.emit('login', 10, 11, 12)

export { }
