// any 类型和任何类型交叉都是any
type IsAny<T> = "any" extends "ts" & T ? true : false;
type IsAnyRes = IsAny<any>;
type IsAnyRes1 = IsAny<1>;

type IsEqualNew<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;
type isEqualNewRes = IsEqualNew<string, any>;

// 如果条件类型左边为never，那么直接返回never
type IsNever<T> = [T] extends [number] ? true : false;
type IsNeverRes = IsNever<never>;

type len = [1, 2, 3]["length"]; // 3
type len2 = number[]["length"]; // number
// 元组和数组的length属性不同
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? false
  : true;
type IsTuple<T> = T extends [...params: infer Eles]
  ? NotEqual<Eles["length"], number>
  : false;

type IsTupleRes = IsTuple<[1, 2, 3]>;
type IsTupleRes2 = IsTuple<number[]>;

type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToIntersectionRes = UnionToIntersection<{ ts: 1 } | { js: 2 }>;

// 获取可选,可选的意思是这个索引可能没有，没有的时候，那 Pick<Obj, Key> 就是空的，所以 {} extends Pick<Obj, Key> 就能过滤出可选索引。

type t = Pick<{ name: string; age?: number }, "age">;

type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};
type GetOptionalRes = GetOptional<{ name: string; age?: number }>;

type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};
type GetRequiredRes = GetRequired<{ name: string; age?: number }>;

type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
type RemoveIndexSignatureRes = RemoveIndexSignature<{
  [key: string]: any;
  sleep(): void;
}>;

type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj;
};

// as const 会将类型推倒变成字面量
const a = {
  a: 1,
  b: 2,
} as const;

type A = typeof a;
// 'a=1&b=2&c=3'
// type ParseQueryString<Str extends string> =

type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}`
    ? {
        [K in Key]: Value;
      }
    : {};
type ParseParamRes = ParseParam<"a=1">;
type MergeParams<
  OneParams extends Record<string, any>,
  OtherParams extends Record<string, any>
> = {
  [Key in keyof OneParams | keyof OtherParams]: Key extends keyof OneParams
    ? Key extends keyof OtherParams
      ? MergeValues<OneParams[Key], OtherParams[Key]>
      : OneParams[Key]
    : Key extends keyof OtherParams
    ? OtherParams[Key]
    : never;
};

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type MergeParamsRes = MergeParams<{ a: 1 }, { b: 1 }>;
type MergeParamsRes2 = MergeParams<{ a: 1 }, { a: 1; c2: 2 }>;

type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;
type ParseQueryStringRes = ParseQueryString<"a=1&b=2&c=3">;
