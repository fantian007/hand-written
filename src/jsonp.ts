// @ts-nocheck
function jsonp(url, jsonpCb, success) {
  const script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = url;

  // 先定义函数，script 脚本加载完毕会调用该函数
  window[jsonpCb] = function (data) {
    success?.(data);
  }

  document.body.append(script);
}

export { };
