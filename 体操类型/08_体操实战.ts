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

type DeepCamelize<Obj extends Record<string, any>> = Obj extends unknown[]
  ? CamelizeArr<Obj>
  : {
      [Key in keyof Obj as Key extends `${infer First}_${infer Rest}`
        ? `${First}${Capitalize<Rest>}`
        : Key]: DeepCamelize<Obj[Key]>;
    };

type CamelizeArr<Arr> = Arr extends [infer First, ...infer Rest]
  ? First extends Record<string, any>
    ? [DeepCamelize<First>, ...CamelizeArr<Rest>]
    : [...CamelizeArr<Rest>]
  : [];

type DeepCamelizeRes = DeepCamelize<{
  aaa_bbb: string;
  bbb_ccc: [
    1,
    {
      ccc_ddd: string;
    },
    {
      ddd_eee: string;
      eee_fff: {
        fff_ggg: string;
      };
    }
  ];
}>;

type AllKeyPath<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Key extends string
    ? Obj[Key] extends Record<string, any>
      ? Key | `${Key}.${AllKeyPath<Obj[Key]>}`
      : Key
    : never;
}[keyof Obj];

type AllKeyPathRes = AllKeyPath<{
  a: {
    b: {
      b1: string;
      b2: string;
    };
    c: {
      c1: string;
      c2: string;
    };
  };
}>;

type Defaultize<A, B> = Pick<A, Exclude<keyof A, keyof B>> &
  Partial<Pick<A, Extract<keyof A, keyof B>>> &
  Partial<Pick<B, Exclude<keyof B, keyof A>>>;

type DefaultizeRes = Copy<Defaultize<{ aaa: 1; bbb: 2 }, { bbb: 2; ccc: 3 }>>;

enum Code {
  a = 1,
  b = 2,
  c = 'abc'
}

type CodeRes = `${Code}`

type StrToNum<Str> = 
Str extends `${infer Num extends number}` ? Num : Str

type CodeRes2 = StrToNum<`${Code}`>
