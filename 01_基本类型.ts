{
  let str: string = 'lck';
  let num: number = 25;
  let bool: boolean = true;
  let u: undefined = undefined;
  let n: null = null;
  let obj: object = { name: 'lck' };
  let sym: symbol = Symbol('me');

  // 枚举
  enum Color { Red, Green, Blue }
  let c: Color = Color.Red;

  // any
  let notSureAny: any = 4;
  notSureAny = "maybe a string instead";
  notSureAny = false; // okay, definitely a boolean

  // never 

  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never {
    throw new Error(message);
  }

  // 推断的返回值类型为never
  function fail() {
    return error("Something failed");
  }

  // 返回never的函数必须存在无法达到的终点
  function infiniteLoop(): never {
    while (true) {
    }
  }


  // unknown, 
  let notSure: unknown = 4;
  notSure = 'may be a string';
  notSure = false;

  function getDog() {
    return '123';
  }

  const dog: unknown = { hello: getDog };
  // dog.hello(); //Error


  function getDogName() {
    let x: unknown;
    return x;
  }

  const dogName = getDogName();
  // const upName = dogName.toLowerCase(); // Error
  if (typeof dogName === 'string') {
    const upName = dogName.toLocaleLowerCase(); // ok
  }
  // 类型断言
  const upName = (dogName as string).toLocaleLowerCase(); // ok

}
