
export const singleton = (func) => {
  let instance;

  const handler = {
    // 可使用 construct 来拦截 new
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(func, args);
      }

      return instance;
    }
  }

  return new Proxy(func, handler);
}

export { }
