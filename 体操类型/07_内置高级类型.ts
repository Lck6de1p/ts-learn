type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type MyParametersRes = MyParameters<(a: number, b: string) => {}>;

type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
type MyReturnTypeRes = MyReturnType<(a: number, b: string) => "typescript">;

type MyConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
interface PersonConstructor {
  new (name: string): Person;
}
type MyConstructorParametersRes = MyConstructorParameters<PersonConstructor>;

type MyInstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : never;
type MyInstanceTypeRes = MyInstanceType<PersonConstructor>;

type MyThisParameterType<T> = T extends (this: infer U, ...arg: any[]) => any
  ? U
  : unknown;

type OmiThisParameter<T> = unknown extends MyThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
type MyPartialRes = MyPartial<{ a: "1"; b: "2" }>;

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};
type MyRequiredRes = MyRequired<{ a?: "1"; b: "2" }>;

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
type MyReadonlyRes = MyReadonly<{ a: "1"; b: 2 }>;

type MyPick<T, K extends keyof T> = {
  [P in K]: T[K];
};
type MyPickRes = MyPick<{ a: "1"; b: 2 }, "a">;

type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};
// 这里很巧妙的用到了 keyof any，它的结果是 string | number | symbol：
type res = keyof any;
type MyRecordRes = MyRecord<"a" | string, number>;

type MyExclude<T, U> = T extends U ? never : T;
type MyExcludeRes = MyExclude<"a" | "b" | "c", "a" | "c">;

type MyExtract<T, U> = T extends U ? T : never;
type MyExtractRes = MyExtract<"a" | "b" | "c", "a" | "c">;

type MyOmit<T, K extends keyof any> = MyPick<T, Exclude<keyof T, K>>;
type MyOmitRes = MyOmit<{ a: 1; b: 2 }, "a">;

type MyAwaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? MyAwaited<V>
    : never
  : T;
type MyAwaitedRes = MyAwaited<Promise<Promise<string>>>;

type MyNonNullable<T> =  T extends null | undefined ? never : T;