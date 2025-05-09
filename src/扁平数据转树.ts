interface Opt {
  id: number;
  parentId: number;
  label: string;
}

interface ITreeNode {
  id: number;
  label: string;
  children: ITreeNode[];
}

export const toTree = (arr: Opt[]): ITreeNode[] => {
  const r: ITreeNode[] = [];
  // 用 map 记录所有节点
  const m = new Map<number, ITreeNode>();

  arr.forEach(d => {
    if (!m.get(d.id)) {
      m.set(d.id, ({ ...d, children: [] }));
    }
  });

  arr.forEach(d => {
    const node = m.get(d.id)!;
    const parentId = d.parentId;
    const parentNode = m.get(parentId);

    if (parentNode === undefined) {
      r.push(node);
    } else {
      parentNode.children.push(node);
    }
  })

  return r;
}

const arr: Opt[] = [
  {
    id: 1,
    parentId: 0,
    label: 'A1',
  },
  {
    id: 2,
    parentId: 0,
    label: 'A2',
  },
  {
    id: 3,
    parentId: 0,
    label: 'A3',
  },
  {
    id: 11,
    parentId: 1,
    label: 'A1-1',
  },
  {
    id: 31,
    parentId: 3,
    label: 'A3-1',
  },
  {
    id: 311,
    parentId: 31,
    label: 'A3-1-1',
  }
];

const r = toTree(arr);
console.log(r);
