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

// typeof

const str = 'lck';
const obj = { name: "lck" };
const nullVar = null;
const undefinedVar = undefined;
const func = (input: string) => {
  return input.length > 10;
}

type Str = typeof str // 'lck';
type Obj = typeof obj // {name: string;};
type Null = typeof nullVar // null;
type Undefined = typeof undefined; // undefined;
type Func = typeof func // (input: string) => boolean; 

// 不仅可以在类型标注里使用typeof，还能在工具类型中使用typeof

const func2: typeof func = (name: string) => {
  return name === 'lck';
}

type FuncReturnType = ReturnType<typeof func>; // boolean


// 在逻辑代码中 typeof为js中的typeof ， 在类型代码中为类型查询的typeof， 所以不允许出现：

const isInputValid = (input: string) => {
  return input.length > 10;
}

// let isValid: typeof isInputValid('lck');

// 类型守卫

declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === "string") {
  // 一定是字符串！
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
  // 一定是数字！
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
  // 一定是布尔值！
  strOrNumOrBool === true;
} else {
  // 要是走到这里就说明有问题！
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}


// 若提取if表达式

function isString(input: unknown): boolean {
  return typeof input === "string";
}

function fooX(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    // (input).replace("linbudu", "linbudu599") // error
  }
  if (typeof input === 'number') { }
}


// is 关键字

// function isString(input: unknown): input is string {
//   return typeof input === "string";
// }


function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swapped = swap(['lck', 100]);


// loadsh的pick函数，接受一个对象，接受一个对象属性名称组成的数组，从这个对象中截取选择的属性部分
// const object = {'a': 1, 'b': 2, 'c': 3};
// _.pick(object, ['a','c']);

// pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U>;


function handle<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload])
  })
}

// Class中的泛型

class Queue<TElementType> {
  private _list: TElementType[];
  constructor(initial: TElementType[]) {
    this._list = initial;
  }

  // 入队一个队列泛型子类型的元素
  enqueue<TType extends TElementType>(ele: TType): TElementType[] {
    this._list.push(ele);
    return this._list;
  }

  // 入队一个任意类型元素（无需为队列泛型子类型）
  enqueueWithUnknownType<TType>(ele: TType): (TElementType | TType)[] {
    return [...this._list, ele];
  }

  // 出队
  dequeue(): TElementType[] {
    this._list.shift();
    return this._list;
  }
}

// 内置方法中的泛型

function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  })
}
const arr: Array<number> = [1, 2, 3];
// arr.push('lck'); // error
// arr.includes('lck'); // error

arr.reduce((prev, curr, idx, arr) => {
  return prev
}, 1);

// arr.reduce((prev, curr, idx, arr) => { // error
//   return [...prev, curr]
// }, []) 
export { }