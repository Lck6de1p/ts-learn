type KebabCaseToCamelCase<Str extends string> =
  Str extends `${infer Item}-${infer Rest}`
    ? `${Item}${KebabCaseToCamelCase<Capitalize<Rest>>}`
    : Str;
type KebabCaseToCamelCaseRes = KebabCaseToCamelCase<"aaa-bbb-ccc">;

type CamelCaseToKebabCase<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First extends Lowercase<First>
      ? `${First}${CamelCaseToKebabCase<Rest>}`
      : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
    : Str;
type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<"aaaBbbCcc">;

type Chunk<
  Arr extends unknown[],
  ItemLen extends number,
  CurItem extends unknown[] = [],
  ResArr extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? CurItem["length"] extends ItemLen
    ? Chunk<Rest, ItemLen, [First], [...ResArr, CurItem]>
    : Chunk<Rest, ItemLen, [...CurItem, First], ResArr>
  : [...ResArr, CurItem];
type ChunkRes = Chunk<[1, 2, 3, 4, 5, 6], 2>;

type TupleToNestedObject<Tuple extends unknown[], Value> = Tuple extends [
  infer First,
  ...infer Rest
]
  ? {
      [Key in First as Key extends keyof any
        ? Key
        : never]: Rest extends unknown[]
        ? TupleToNestedObject<Rest, Value>
        : Value;
    }
  : Value;
type TupleToNestedObjectRes = TupleToNestedObject<[1, 2, 3], "a">;

type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};

type PartialObjectPropByKeys<
  Obj extends Record<string, any>,
  Key extends keyof any
> = Copy<Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>>;
//  ts 的类型只有在用到的的时候才会去计算，这里并不会去做计算。我们可以再做一层映射，当构造新的索引类型的时候，就会做计算了
type PartialObjectPropByKeysRes = PartialObjectPropByKeys<
  { a: 1; b: 2; c: 2 },
  "a" | "b"
>;

type UnionToIntersection2<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer ReturnType
  ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
  : [];

type UnionToTupleRes = UnionToTuple<"a" | "b" | "c">;

declare function join<Delimiter extends string>(
  delimiter: Delimiter
): <Items extends string[]>(...parts: Items) => JoinType<Items, Delimiter>;

type JoinType<
  Items extends any[],
  Delimiter extends string,
  Result extends string = ""
> = Items extends [infer Cur, ...infer Rest]
  ? JoinType<Rest, Delimiter, `${Result}${Delimiter}${Cur & string}`>
  : RemoveFirstDelimiter<Result>;
  
type RemoveFirstDelimiter<Str extends string> =
  Str extends `${infer _}${infer Rest}` ? Rest : Str;

const joinRes = join("-")("a", "b", "c");
