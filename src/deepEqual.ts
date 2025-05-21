// @ts-nocheck
function deepEqual(o1, o2) {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;

  const ks1 = Object.getOwnPropertyNames(o1);
  const ks2 = Object.getOwnPropertyNames(o2);

  if (ks1.length !== ks2.length) return false;

  for (const k of ks1) {
    if (!deepEqual(o1[k], o2[k])) return false;
  }

  return true;
}

// ----
const objA = { a: 1, b: { c: 2 } };
const objB = { a: 1, b: { c: 1 } };
console.log(deepEqual(objA, objB)); // true

export { }
