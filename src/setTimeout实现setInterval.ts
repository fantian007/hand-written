// setTimeout 实现 setInterval
export function setInterval (fn, delay) {
  function loop () {
    fn();
    setTimeout(loop, delay);
  }

  return setTimeout(loop, delay);
};
