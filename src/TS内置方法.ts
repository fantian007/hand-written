type Required<T> = {
  [K in keyof T]-?: T[K];
}

type Partial<T> = {
  [K in keyof T]?: T[K];
}

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
}

type Pick<T, S extends keyof T> = {
  [K in S]: T[K];
}

type Exclude<T, U> = T extends U ? never: T;
type Extract<T, U> = T extends U ? T : never;

// 合法的 键类型
type A = keyof any; // string | number | symbol

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type NonNullable<T> = T extends null | undefined ? never : T;

type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any) => infer R ? R : never;

export { }
