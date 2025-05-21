// 旧版 身份证 15 位
// 新版 身份证 17 + X/x 或者 18 位数字
export const regexp = /^\d{15}$|^\d{17}[\dXx]$/;
