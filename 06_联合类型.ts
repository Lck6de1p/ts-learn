{
  // 交叉类型

  type IntersectionType = { id: number; name: string; } & { age: number };
  const mixed: IntersectionType = {
    id: 1,
    name: 'name',
    age: 18
  }


  type InertSectionType2 = { id: number; name: string } & { age: number; name: number };
  // const mixedConflict: InertSectionType2 = {
  //   id: 1,
  //   name: 2, // ts(2322) 错误，'number' 类型不能赋给 'never' 类型
  //   age: 2
  // };


  type InertSectionType3 = { id: number; name: 2; }
    & { age: number; name: number; };

  let mixedConflict: InertSectionType3 = {
    id: 1,
    name: 2, // ok
    age: 2
  };
  // mixedConflict = {
  //   id: 1,
  //   name: 22, // '22' 类型不能赋给 '2' 类型
  //   age: 2
  // };

  // 同名属性是非基本数据类型
  interface A {
    x: { d: true },
  }
  interface B {
    x: { e: string },
  }
  interface C {
    x: { f: number },
  }
  type ABC = A & B & C
  let abc: ABC = {
    x: {
      d: true,
      e: '',
      f: 666
    }
  }


  // interface Person {
  //   name: string;
  //   age?: number; // Error
  //   [propName: string]: string;
  // }

  // let tom: Person = {
  //   name: 'Tom',
  //   age: 25,
  //   gender: 'male'
  // };

  interface Person {
    name: string;
    age?: number; 
    [propName: string]: any;
  }

  let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
  };


  interface LabeledValue {
    label: string;
  }
  function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
  }
  let myObj = { size: 10, label: "Size 10 Object" };
  printLabel(myObj); // OK

  // printLabel({ size: 10, label: "Size 10 Object" }); // Error

  // 上面代码，在参数里写对象就相当于是直接给labeledObj赋值，这个对象有严格的类型定义，所以不能多参或少参。
  // 而当你在外面将该对象用另一个变量myObj接收，myObj不会经过额外属性检查，但会根据类型推论为
  // let myObj: { size: number; label: string } = { size: 10, label: "Size 10 Object" };，
  // 然后将这个myObj再赋值给labeledObj，此时根据类型的兼容性，两种类型对象，参照鸭式辨型法，
  // 因为都具有label属性，所以被认定为两个相同，故而可以用此法来绕开多余的类型检查。

}