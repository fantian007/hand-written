const bubbleSort = (arr: number[]) => {
  const len = arr.length;

  // i 表示 已排序的个数
  for (let i = 0; i < len - 1; i++) {
    // 主要是 j, j+1； 2者进行比较
    for (let j = 0; j < len - i - 1; j++) {
      // 相邻的比较
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    };
  };

  return arr;
}

const arr = [1, 4, 3, 2, 0];
const r = bubbleSort(arr);
console.log(r);

export { }
