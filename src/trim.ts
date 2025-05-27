export const trim = (str: string) => str.replace(/(^\s*)|(\s*$)/g, '');

console.log(trim('  Hello World '));
