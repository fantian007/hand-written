// @ts-nocheck
// 2. 实现简易的 React 状态管理， 实现 createStore 和 useStore
import { useState, useLayoutEffect } from 'react';
import { PubSub } from './scripts'; // 发布订阅类

function createStore(value: number) {
  const sub = new PubSub(value);

  return sub;
}

function useStore (sub) {
  const [value, setValue] = useState(sub.data);

   const setValueEnhance = (v) => {
      sub.publish(v);
   }

   useLayoutEffect(() => {
    sub.subscribe((v) => {
      setValue(v);
    });
   });

   return [value, setValueEnhance];
}


const store = createStore(0);

function Counter() {
  const [count, setCount] = useStore(store);

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
