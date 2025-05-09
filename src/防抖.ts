export const debounce = <T extends (...args) => any>(fn: T, delay = 0) => {
  let timer: NodeJS.Timer | null = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}

export {}
