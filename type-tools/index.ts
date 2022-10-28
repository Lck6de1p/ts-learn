type MaybeNull<T> = T | null;

function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}

type MaybeArray<T> = T | T[];

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input]
}

// 索引签名类型

interface AllStringTypes {
  [key: string]: string;
}

type PropType1 = AllStringTypes['lck']; // string
type PropType2 = AllStringTypes['511']; // string

const foo: AllStringTypes = { "lck": '14' }

interface AllStringTypes2 {
  propA: number;
  propB: boolean;
  [key: string]: number | Boolean;
}
// 索引签名类型的一个常见场景是在重构 JavaScript 代码时，为内部属性较多的对象声明一个 any 的索引签名类型，以此来暂时支持对类型未明确属性的访问，并在后续一点点补全类型：

interface AnyTypeHere {
  [key: string]: any;
}

const foo1: AnyTypeHere['lck'] = 'any value';

// 索引类型查询

interface Foo {
  lck: 1;
  511: 2;
}

type FooKeys = keyof Foo; // 'lck' | 511 


type Stringify<T> = {
  [K in keyof T]: String;
}

interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo = Stringify<Foo>;

// 等价于

// interface StringifiedFoo {
//   prop1: string;
//   prop2: string;
//   prop3: string;
//   prop4: string;
// }


type Clone<T> = {
  [K in keyof T]: T[K];
}


export { }