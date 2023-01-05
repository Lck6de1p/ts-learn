// 加法
type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArray<Num1>,
  ...BuildArray<Num2>
]["length"];
type AddRes = Add<10, 2>;

// 减法
type Subtract<
  Num1 extends number,
  Num2 extends number
> = BuildArray<Num1> extends [...BuildArray<Num2>, ...infer Rest]
  ? Rest["length"]
  : never;
type SubtractRes = Subtract<10, 2>;

// 乘法
type Multiply<
  Num1 extends number,
  Num2 extends number,
  ResArr extends unknown[] = []
> = Num2 extends 0
  ? ResArr["length"]
  : Multiply<Num1, Subtract<Num2, 1>, [...ResArr, ...BuildArray<Num1>]>;
type MultiplyRes = Multiply<2, 10>;

// 除法
type Divide<
  Num1 extends number,
  Num2 extends number,
  ResArr extends unknown[] = []
> = Num1 extends 0
  ? ResArr["length"]
  : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...ResArr]>;
type DivideRes = Divide<10, 2>;

// 字符串长度
type StrLen<
  Str extends string,
  ResArr extends unknown[] = []
> = Str extends `${string}${infer Rest}`
  ? StrLen<Rest, [unknown, ...ResArr]>
  : ResArr["length"];
type StrLenRes = StrLen<"type">;

// 比较两个数值大小
type GreaterThan<
  Num1 extends number,
  Num2 extends number,
  ResArr extends unknown[] = []
> = Num1 extends Num2
  ? false
  : ResArr["length"] extends Num2
  ? true
  : ResArr["length"] extends Num1
  ? false
  : GreaterThan<Num1, Num2, [unknown, ...ResArr]>;

type GreaterThanRes = GreaterThan<10, 2>;
type GreaterThanRes2 = GreaterThan<10, 10>;
type GreaterThanRes3 = GreaterThan<10, 20>;

// 斐波那契数
type Fibonacci<
  Num extends number,
  PrevArr extends unknown[] = [unknown],
  CurrentArr extends unknown[] = [unknown]
> = Num extends 1 | 2
  ? CurrentArr["length"]
  : Fibonacci<Subtract<Num, 1>, CurrentArr, [...CurrentArr, ...PrevArr]>;

type FibonacciRes = Fibonacci<8>;
