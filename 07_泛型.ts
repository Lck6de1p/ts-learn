{

  /**
   * K(key) 表示对象中键的类型
   * V(Value) 表示对象中值的类型
   * E(Element) 表示元素类型
   */
  function identity<T>(arg: T): T {
    return arg
  }

  function identity2<T, U>(value: T, message: U): T {
    console.log(message);
    return value;
  }

  console.log(identity2<number, string>(6, 'lck'))
  console.log(identity2(6, 'lck'))



  function trace<T>(arg: T): T {
    // console.log(arg.size) // Error;
    return arg;
  }

  interface Sizeable {
    size: number;
  }

  function trace2<T extends Sizeable>(arg: T): T {
    console.log(arg.size);
    return arg;
  }

  // type
  interface Person {
    name: string;
    age: number;
  }

  const person: Person = { name: "lck", age: 30 };
  type Person2 = typeof person;

  const person2: Person2 = { name: "lck2", age: 30 };

  // keyof
  type K1 = keyof Person; // "name" | "age"
  type K2 = keyof Person[]; // 'length' | 'toString | pop | push ...
  type K3 = keyof { [x: string]: Person } // string | number

  // keyof的作用

  // 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "{}"。
  // 在类型 "{}" 上找不到具有类型为 "string" 的参数的索引签名。
  // function prop(obj: object, key: string) {
  //   return obj[key];
  // }

  function prop<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  type Todo = {
    id: number;
    text: string;
    done: boolean;
  }

  const todo: Todo = {
    id: 1,
    text: "learn TS",
    done: false,
  }

  const id = prop(todo, 'id');
  const text = prop(todo, 'text');
  const done = prop(todo, 'done');
  console.log(id, text, done);

  // 阻止访问不存在的属性
  // const newProp = prop(todo, 'newProp'); // error


  // in 用来遍历枚举类型

  type Keys = 'a' | 'b' | 'c';
  type Obj = {
    [p in Keys]: any
  }


  // 索引类型

  {
    const person = {
      name: 'lck',
      age: 25
    }

    function getValues(person: any, keys: string[]) {
      return keys.map(key => person[key])
    }

    console.log(getValues(person, ['name', 'age'])) // ['lck', 25]
    console.log(getValues(person, ['gender'])) // [undefined]

    // T[K]表示对象T的属性K所表示的类型，在上述例子中，T[K][] 表示变量T取属性K的值的数组
    function getValues2<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
      return keys.map(key => person[key])
    }

    interface Person {
      name: string;
      age: number;
    }

    const person2: Person = {
      name: 'lck',
      age: 25
    }
    getValues2(person2, ['name'])
    // getValues2(person2, ['name1']) // error
  }


}