/**
 * 时间戳 版本
 * 第一次执行，最后一次不会执行
 */
const throttle = <T extends (...args) => any>(fn: T, delay = 0) => {
  let prevTime = Date.now();

  return (...args) => {
    if (Date.now() - prevTime < delay) {
      return;
    }

    fn.apply(this, args);
    prevTime = Date.now();
  }
}

/**
 * 定时器 版本
 * 第一次不执行，最后一次执行
 */
const throttle2 = <T extends (...args) => any>(fn: T, delay = 0) => {
  let timer: NodeJS.Timer | null = null;

  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);

        timer = null;
      }, delay);
    }
  }
}

export { }
