type ttt = Promise<Promise<Promise<Record<string, any>>>>;

type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer ValueType
>
  ? ValueType extends Promise<unknown>
    ? DeepPromiseValueType<ValueType>
    : ValueType
  : never;
type DeepPromiseValueTypeRes = DeepPromiseValueType<ttt>;

type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType2<ValueType>
  : T;
type DeepPromiseValueTypeRes2 = DeepPromiseValueType2<ttt>;

// ReverseArr

type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer One,
  infer Two,
  infer Three
]
  ? [Three, Two, One]
  : never;
type ReverseArrRes = ReverseArr<arr>;

type ReverseArr2<Arr extends unknown[]> = Arr extends [infer One, ...infer Rest]
  ? [...ReverseArr2<Rest>, One]
  : Arr;

type ReverseArrRes2 = ReverseArr2<arr>;

// includes
// 相等的判断就是 A 是 B 的子类型并且 B 也是 A 的子类型
type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer One,
  ...infer Rest
]
  ? IsEqual<One, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;
type IncludesRes = Includes<arr, 12>;

// RemoveItem
// 创建一个结果数组初始化为[],用于存储
type RemoveItem<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = []
> = Arr extends [infer One, ...infer Rest]
  ? IsEqual<One, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, One]>
  : Result;
type RemoveItemRes = RemoveItem<[1, 2, 3, 4, 1, 23, 11, 1, 1, 1], 1>;

// 创建元素个数不确定的数组

type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;
type BuildArrayRes = BuildArray<10, 1, [2]>;

// 替换所有的目标字符
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${ReplaceAll<Suffix, From, To>}`
  : Str;
type ReplaceAllRes = ReplaceAll<"ts is ? ? ? ts ?", "?", "js">;

// 提取字符串的每个字符

type StringToUnion<Str extends string> =
  Str extends `${infer Prefix}${infer Rest}`
    ? Prefix | StringToUnion<Rest>
    : never;
type StringToUnionRes = StringToUnion<"typescript">;

// 反转字符串

type ReverseStr<Str extends string> = Str extends `${infer Prefix}${infer Rest}`
  ? `${ReverseStr<Rest>}${Prefix}`
  : Str;
type ReverseStrRes = ReverseStr<"typescript">;

// 对象的递归
// ts 的类型只有被用到的时候才会做计算。
// 所以可以在前面加上一段 Obj extends never ? never 或者 Obj extends any 等，从而触发计算：
type DeepReadonly<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
          ? Obj[Key]
          : DeepReadonly<Obj[Key]>
        : Obj[Key];
    }
  : never;
type DeepReadonlyRes = DeepReadonly<{
  a: {
    b: {
      c: {
        f: () => "dong";
        d: {
          e: {
            ts: string;
          };
        };
      };
    };
  };
}>;
