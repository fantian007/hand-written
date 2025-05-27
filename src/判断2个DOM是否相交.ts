function isElementIntersecting(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// 使用示例
const elementA = document.getElementById('element-a');
const elementB = document.getElementById('element-b');
console.log(isElementIntersecting(elementA, elementB)); // true/false
