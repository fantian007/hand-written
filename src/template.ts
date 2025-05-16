const render = (template: string, data: any) => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    // match: {{name}}；key: name
    return data.hasOwnProperty(key) ? data[key] : match;
  });
}

// 使用示例
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '张三',
  age: 18
};

console.log(render(template, data)); 
