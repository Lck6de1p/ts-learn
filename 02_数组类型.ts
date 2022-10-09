() => {
  let arr: string[] = ['1', '1'];
  let arr2: Array<string> = ['1', '2'];
  let arr3: (number | string)[];
  arr3 = [1, 2, 'a', 'b'];

  interface Arrobj {
    name: string,
    age: number
  }

  let arr4: Arrobj[] = [{ name: 'lck', age: 25 }];
}
