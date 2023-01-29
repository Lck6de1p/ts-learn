// 协变
interface Person1 {
  name: string;
  age: number;
}

interface Lck {
  name: string;
  age: number;
  hobbies: string[];
}

let person: Person1 = {
  name: "",
  age: 29,
};

let lck: Lck = {
  name: "lck",
  age: 22,
  hobbies: ["ts", "js"],
};

person = lck;

// 逆变

let printHobbies: (lck: Lck) => void;

printHobbies = (lck) => {
  console.log(lck.hobbies);
};

let printName: (person: Person1) => void;
printName = (p) => {
  console.log(p.name);
};

printHobbies = printName
// printName = printHobbies // error

type Func = (a: string) => void;

// const func: Func = (a: 'hello') => undefined 

/**
* 总结：函数的参数具有逆变性返回值具有协变性质
*
* 参数：（逆变）也就是在规定类型后 类型向内收缩 {a: number, b: number, c: number} ==逆变==> {a: 1}
*
* 返回值：（协变）在规定类型后 类型向外扩张 {a: number} ==协变==> {a: 1, b: 1, c: 1}
*
* 双向协变：此时有两个类型 一个父类型，一个子类型 由函数的参数类型分别使用这两个类型后能够互相赋值的条件下
*/
