// JSON.stringify() 会丢弃 函数、undefind、symbol


function checkType(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

function cloneDeep(target) {
  let r;
  let targetType = checkType(target);

  if (targetType === 'Object') {
    r = {};
  }
  else if (targetType === 'Array') {
    r = [];
  } else {
    return target;
  }

  // 注意： for...in 会包含 原型链上的 可枚举 属性
  for (const k in target) {
    const v = target[k];

    if (checkType(v) === 'Object' || checkType(v) === 'Array') {
      r[k] = cloneDeep(v);
    } else {
      r[k] = v;
    }
  }

  return r;
}
