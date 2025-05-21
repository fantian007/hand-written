// @ts-nocheck
const toArr = (tree, parentId?) => {
  let r = [];

  for (const t of tree) {
    const { children, ...rest } = t;

    r.push({ ...rest, parentId });

    if (children?.length) {
      r = r.concat(toArr(children, t.id));
    }
  }

  return r;
}

// ----
const tree = [
  {
    id: 1,
    label: '1',
    children: [
      {
        id: 2,
        label: '2'
      },
      {
        id: 3,
        label: '3',
        children: [
          {
            id: 31,
            label: '31'
          }
        ]
      }
    ]
  }
];

const r = toArr(tree);
console.log(JSON.stringify(r));

export { }
