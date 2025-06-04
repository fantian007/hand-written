// 完整版本
const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 0,
  options: { leading?: boolean; trailing?: boolean } = {}
): ((...args: Parameters<T>) => ReturnType<T> | undefined) => {
  const { leading = true, trailing = true } = options;
  let lastExecTime = 0;
  let timer: NodeJS.Timeout | null = null;
  let lastArgs: any[] | null = null;

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    const currentTime = Date.now();
    const elapsed = currentTime - lastExecTime;
    lastArgs = args;

    // 处理 leading 调用
    if (elapsed >= delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      const result = fn.apply(this, args);
      lastExecTime = currentTime;
      return result;
    }

    // 处理 trailing 调用
    if (trailing && !timer) {
      timer = setTimeout(() => {
        if (lastArgs) {
          const result = fn.apply(this, lastArgs);
          lastExecTime = Date.now();
          lastArgs = null;
        }
        timer = null;
      }, delay - elapsed);
    }

    return undefined;
  };
};