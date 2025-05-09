// 方式一：使用 API 解析
export const parseURL = (url: string) => {
  let r = {};

  const urlObj = new URLSearchParams(new URL(url).search);

  for (const [k, v] of urlObj.entries()) {
    r[k] = v;
  }

  return r;
}

// 方式二：手动解析
export const parseURL2 = (url: string) => {
  const r = {};

  const search = url.split('?')[1];

  const p = search.split('&');

  for (const t of p) {
    const [k, v] = t.split('=');

    r[k] = v;
  }

  return r;
}

export { }
