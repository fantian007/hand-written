
// 当前激活的 副作用函数
let activeEffect: (() => void) | null = null;

// 依赖收集
class Dep {
  private subs: Set<() => void> = new Set();

  // 添加
  depend() {
    if (activeEffect) {
      this.subs.add(activeEffect);
    }
  }

  // 通知
  notify() {
    this.subs.forEach(effect => effect());
  }
}

// 创建副作用函数
const effect = (cb: () => void) => {
  activeEffect = cb;
  cb();
  activeEffect = null;
}

// 存储对象属性的依赖
// { [各对象]: { key: Dep } }
const targetMap = new WeakMap();

// 获取对象属性的依赖
const getDep = (target: object, key: string | symbol) => {
  let depsMap = targetMap.get(target) as Map<typeof key, any>;

  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key) as Dep | undefined;

  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

// reactive
const reactive = <T extends object>(o: T): T => {
  return new Proxy(o, {
    get(target, key, receiver) {
      const dep = getDep(target, key);
      dep.depend();

      return Reflect.get(target, key, receiver);
    },

    set(target, key, value, receiver) {
      const dep = getDep(target, key);
      dep.notify();

      return Reflect.set(target, key, value, receiver);
    }
  });
}

// 测试
const o = { count: 0 };
const o1 = reactive(o);

/**
 * effect 执行时，将内部回调赋值给全局变量，然后 o1.count 走 getter 时，将全局变量放入 o1.count 的 Dep.subs 里
 * 当 o1.count++ 时，走 setter，再 notify 执行 o1.count 的 Dep.subs
 */
effect(() => {
  console.log('当前值是：', o1.count);
});

o1.count++;
o1.count++;
