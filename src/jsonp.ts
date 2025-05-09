// @ts-nocheck
function jsonp(url, jsonpCb, success) {
  const script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = url;

  window[jsonpCb] = function (data) {
    success?.(data);
  }

  document.body.append(script);
}

export { };
