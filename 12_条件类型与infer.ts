function universalAdd<T extends number | bigint | string>(x: T, y: T) {
  return x + (y as any);
}

universalAdd(599, 1); // T 填充为 599 ｜ 1
universalAdd('lck', '123'); // T填充为‘lck‘ | ‘123’


type LiteralToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never;

function universalAdd2<T extends number | bigint | string>(
  x: T,
  y: T
): LiteralToPrimitive<T> {
  return x + (y as any);
}

universalAdd2("lck", "9"); // string
universalAdd2(599, 1); // number
universalAdd2(10n, 10n); // bigint

type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string ? ' A string return Function!'
  : 'A non-string return Function!'

type StringResult = FunctionConditionType<() => string>;
type NonStringResult = FunctionConditionType<() => boolean>;
type NonStringResult2 = FunctionConditionType<() => number>;


// infer 关键字

type FunctionReturnType<T extends Func> = T extends (
  ...args: any[]
) => infer R ? R : never;
// 上面的代码其实表达了，当传入的类型参数满足 T extends (...args: any[] ) => infer R 
// 这样一个结构（不用管 infer R，当它是 any 就行），返回 infer R 位置的值，即 R。否则，返回 never。


type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;
type SwapResult1 = Swap<[1, 2]>  // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]> // 不符合结构，没有发生替换，仍是 [1, 2, 3]


// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [String, End]
  : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Rest,
  infer End
] ? [End, ...Rest, Start] : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Rest
] ? [Start2, Start1, Rest] : T


type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;
type ArrayItemTypeResult1 = ArrayItemType<[]> //never;
type ArrayItemTypeResult2 = ArrayItemType<string[]> // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]> // string | number

// 提取对象的属性类型

type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R } ? R : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string, age: number }, 'name' | 'age'> // string | number

// 反转键名与键值
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V> ? Record<V & string, K> : never;
type ReverseKeyValueRes = ReverseKeyValue<{ "key": "value" }> // {"value": "key"}
// & string ，泛型参数 V 的来源是从键值类型推导出来的，TypeScript 中这样对键值类型进行 infer 推导，将导致类型信息丢失，而不满足索引签名类型只允许 string | number | symbol 的要求。

// infer 结构还可以是Promise
type PromiseValue<T> = T extends Promise<infer V> ? V : T;
type PromiseValueResult1 = PromiseValue<Promise<number>> // number
type PromiseValueResult2 = PromiseValue<number> // number
type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>>; // Promise<boolean>，只提取了一层

// 嵌套提取
type PromiseValue2<T> = T extends Promise<infer V>
  ? V extends Promise<infer N>
  ? N
  : V
  : T;
type PromiseValueResult4 = PromiseValue2<Promise<Promise<boolean>>>; // boolean

// 优化，使用递归提取
type PromiseValue3<T> = T extends Promise<infer V> ? PromiseValue3<V> : T;


export { }