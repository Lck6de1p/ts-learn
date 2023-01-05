type tuple = [1, 2, 3];

type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type PushRes = Push<tuple, 4>;

type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];
type UnshiftRes = Unshift<tuple, 0>;

type tuple1 = [1, 2];
type tuple2 = ["ts", "js"];

type Zip<
  One extends [unknown, unknown],
  Other extends [unknown, unknown]
> = One extends [infer OneFirst, infer OneSecond]
  ? Other extends [infer OtherFirst, infer OtherSecond]
    ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]
    : []
  : [];
type ZipRes = Zip<tuple1, tuple2>;

// 合并任意长度

type tuple3 = [1, 2, 3, 4, 5, 6];
type tuple4 = ["a", "b", "c", "d", "e", "f"];

type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], Zip2<OneRest, OtherRest>]
    : []
  : [];
type Zip2Res = Zip2<tuple3, tuple4>;

type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;

type CapitalizeStrRes = CapitalizeStr<"typescript">;

type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;
type CamelCaseRes = CamelCase<"ts_ts_ts">;

type DropSubStr<
  Str extends string,
  Sub extends string
> = Str extends `${infer Prefix}${Sub}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, Sub>
  : Str;
type DropSubStrRes = DropSubStr<"ts_ts_ts", "_">;

type obj = {
  readonly name: string;
  age?: number;
  gender: boolean;
};

type Mapping<Obj extends object> = {
  [Key in keyof Obj]: Obj[Key];
};
type MappingRes = Mapping<{ a: 1; b: 2 }>;

type UppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
type UppercaseKeyRes = UppercaseKey<{ ts: "ts" }>;

type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};
type ToReadonlyRes = ToReadonly<obj>;

type ToPartial<T> = {
  [Key in keyof T]?: T[Key];
};
type ToPartialRes = ToPartial<obj>;

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};
type ToMutableRes = ToMutable<obj>;

type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
type ToRequiredRes = ToRequired<obj>;

/**
 * 
 * 
 *  类型参数 Obj 为要处理的索引类型，通过 extends 约束为索引为 string，值为任意类型的索引类型 Record<string, any>。
    类型参数 ValueType 为要过滤出的值的类型。
    构造新的索引类型，索引为 Obj 的索引，也就是 Key in keyof Obj，但要做一些变换，也就是 as 之后的部分。
    如果原来索引的值 Obj[Key] 是 ValueType 类型，索引依然为之前的索引 Key，否则索引设置为 never，never 的索引会在生成新的索引类型时被去掉。
    值保持不变，依然为原来索引的值，也就是 Obj[Key]。
    这样就达到了过滤索引类型的索引，产生新的索引类型的目的
 */
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};
interface Person {
  name: string;
  age: number;
  hobbies: string[];
}
type FilterByValueTypeRes = FilterByValueType<Person, string | number>;
