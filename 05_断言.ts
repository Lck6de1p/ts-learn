{
  let someValue: any = 'this is a string';
  let strLen: number = (someValue as string).length;
  let strLen2: number = (<string>someValue).length;

  let myNullOrUndefinedOrString: null | undefined | string;

  // myNullOrUndefinedOrString.toString(); // Error
  myNullOrUndefinedOrString!.toString(); // Error


  // 确定赋值断言

  let x: number;
  init();

  // console.log(x); // Error
  console.log(x!); // Error
  function init() {
    x = 10;
  }

  // 类型断言的意义就等同于你在告诉程序，你很清楚自己在做什么，此时程序自然就不会再进行额外的属性检查了。

  interface Props {
    name: string;
    age: number;
    money?: number
  }

  let p: Props = {
    name: "lck",
    age: 25,
    money: 1,
    sex: 'male' // OK
  } as Props;

}