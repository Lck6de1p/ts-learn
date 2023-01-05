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

type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};
interface Person {
  name: string;
  age: number;
  hobbies: string[];
}
type FilterByValueTypeRes = FilterByValueType<Person, string | number>;
