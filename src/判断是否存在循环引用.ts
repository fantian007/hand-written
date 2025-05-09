
// 用一个 set 记录访问过的对象
export const isCycle = (obj: any) => {
  const visited = new Set();

  const traverse = (curObj: any) => {
    if (typeof curObj === 'object' && curObj !== null) {
      if (visited.has(curObj)) {
        return true;
      }

      visited.add(curObj);

      for (const k in curObj) {
        if (traverse(curObj[k])) {
          return true;
        }
      }

      // 遍历完当前对象及其子对象，要删除记录（同级对象都引用另一个对象，不叫循环引用）
      visited.delete(curObj);
    } else {
      return false;
    }
  }

  return traverse(obj);
}

export { }
