type arr = [1, 2, 3];

type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;

type First = GetFirst<arr>;

type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;

type Last = GetLast<arr>;

type PopArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...infer Rest, unknown]
  ? Rest
  : never;

type Rest1 = PopArr<[]>;
type Rest2 = PopArr<arr>;

type ShiftArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never;

type Rest3 = ShiftArr<[]>;
type Rest4 = ShiftArr<arr>;

// startsWith

type StartsWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;

type StartsWithLck = StartsWith<"lck123", "lck">;

// replace

type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;

type replaceWord = ReplaceStr<"ts is ?", "?", "interesting">;
type replaceWord2 = ReplaceStr<"ts ? interesting", "?", "is">;

// trim

type TrimRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimRight<Rest>
  : Str;

type trim1 = TrimRight<"ts is interesting     ">;

type TrimLeft<Str extends string> = Str extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimLeft<Rest>
  : Str;
type trim2 = TrimLeft<"    ts is interesting">;

type Trim<Str extends string> = TrimLeft<TrimRight<Str>>;

type trim3 = Trim<"    ts is interesting   ">;

// 函数

type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

type ParametersResult = GetParameters<(name: string, age: number) => string>;

type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;

type ReturnTypeRes = GetReturnType<(name: string, age: number) => string>;

class Dog {
  name: string;
  constructor() {
    this.name = "dog";
  }

  say(this: Dog) {
    return "hello, i'm" + this.name;
  }
}

const dog = new Dog();
// dog.say.call({name: "123"}); // error

type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  args: any[]
) => any
  ? ThisType
  : unknown;

type GetThisParameterTypeRes = GetThisParameterType<typeof dog.say>;

// 构造器

interface Person {
  name: string;
}

interface PersonConstructor {
  new (name: string): Person;
}

type GetInstanceType<ConstructorType extends new (...args: any) => any> =
  ConstructorType extends new (...args: any) => infer InstanceType
    ? InstanceType
    : any;

type GetInstanceTypeRes = GetInstanceType<PersonConstructor>;

type GetConstructorParameters<
  ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: infer ParametersType) => any
  ? ParametersType
  : never;

type GetConstructorParametersRes = GetConstructorParameters<PersonConstructor>;

// 索引类型

type GetRefProps<Props> = "ref" extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;

type GetRefPropsRes = GetRefProps<{ ref?: 1; name: "ts" }>;
type GetRefPropsRes2 = GetRefProps<{ ref?: undefined; name: "ts" }>;
