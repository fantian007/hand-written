function insertSort(arr) {
  // 从第二个元素开始遍历数组
  for (let i = 1; i < arr.length; i++) {
    // 当前待插入的元素
    let current = arr[i];
    // 前一个元素的索引
    let j = i - 1;

    // 向前查找插入位置，同时移动元素
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    // 插入当前元素
    arr[j + 1] = current;
  }

  return arr;
}

const arr = [1, 4, 3, 2, 0];
const r = insertSort(arr);
console.log(r);

export { }
