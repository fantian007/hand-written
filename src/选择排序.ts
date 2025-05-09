const selectSort = (arr: number[]) => {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    // 从剩下的元素中选择最小的，放到 i 的位置
    for (let j = i + 1; j < len; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };
  };

  return arr;
}

const arr = [1, 4, 3, 2, 0];
const r = selectSort(arr);
console.log(r);

export { }
