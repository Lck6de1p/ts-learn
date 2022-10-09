{
  const sum = (x: number, y: number): number => {
    return x + y;
  }
  sum(1, 2);

  // 可选参数
  function foo(firstName: string, lastName?: string) {
    if (lastName) {
      return firstName + ' ' + lastName;
    } else {
      return firstName;
    }
  }
  foo('tom');

  // 参数默认值
  function bar(firstName: string, lastName: string = 'cat') {
    if (lastName) {
      return firstName + ' ' + lastName;
    } else {
      return firstName;
    }
  }
  bar('tom');

  // 剩余参数
  function push(array: any[], ...items: any[]) {
    items.forEach((item) => {
      array.push(item)
    })
  }
  let a: any = [];
  push(a, 1, 2, 3, 4);


  // 函数重载
  type Combinable = string | number;
  function add(a:number,b:number):number;
  function add(a: string, b: string): string;
  function add(a: string, b: number): string;
  function add(a: number, b: string): string;
  function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
      return a.toString() + b.toString();
    }
    return a + b;
  }
  add(1, 2); // 3
  add("1", "2"); //"12"
  const result = add('Semlinker', ' Kakuqo');
  result.split(' ');
  // 类型“string | number”上不存在属性“split”。
  // 类型“number”上不存在属性“split”。ts(2)
}
