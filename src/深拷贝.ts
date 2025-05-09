// JSON.stringify() 会丢弃 函数、undefind、symbol


function checkType(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

function clone(target) {
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

  for (const k in target) {
    const v = target[k];

    if (checkType(v) === 'Object' || checkType(v) === 'Array') {
      r[k] = clone(v);
    } else {
      r[k] = v;
    }
  }

  return r;
}
