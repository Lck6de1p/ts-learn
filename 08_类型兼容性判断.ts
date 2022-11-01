//Duck Typing 鸭子类型
// 这是因为，TypeScript 比较两个类型并非通过类型的名称（即 feedCat 函数只能通过 Cat 类型调用），而是比较这两个类型上实际拥有的属性与方法。也就是说，这里实际上是比较 Cat 类型上的属性是否都存在于 Dog 类型上。
// OK
// class Cat {
//   eat() { }
// }

// class Dog {
//   eat() { }
// }

// function feedCat(cat: Cat) { };
// feedCat(new Dog()) 


// ERROR
// class Cat {
//    eat() { },
//    meow() {}
// }

// class Dog {
//   eat() { }
// }

// function feedCat(cat: Cat) { };
// feedCat(new Dog()) 


// OK
// class Cat {
//   eat() { }
// }

// class Dog {
//   eat() { }
//   meow() { }

// }

// function feedCat(cat: Cat) { };
// feedCat(new Dog())

// ERROR
// class Cat{
//   eat(): boolean {
//     return true
//   }
// }

// class Dog {
//   eat(): number {
//     return 1
//   }
// }

// function feetCat(cat: Cat) {}
// feetCat(new Dog());


function universalAdd<T extends number | bigint | string>(x: T, y: T) {
  return x + (y as any);
}
universalAdd(599, 1); // T 填充为 599 | 1
universalAdd("lin1budu", "599"); // T 
export { }