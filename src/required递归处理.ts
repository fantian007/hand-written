export type RequiredAll<T> = T extends object ? {
  [K in keyof T]-?: RequiredAll<T[K]>
} : T;

// ----
interface A {
  id: number;
  name?: string;
  child: {
    age?: number;
  }[]
}

type B = RequiredAll<A>;
