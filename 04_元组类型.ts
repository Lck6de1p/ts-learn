{
  // 注意，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误
  let x: [string, number];
  x = ['hello', 1];
  // x = ['hello', 1, 1]; error
  // x = [1, "e"]; error
  let employee: [number, string] = [1, 'ck'];
  const [id, name] = employee;
  console.log(id, name);

  // 可选元素
  let person: [number, string?] = [1];

  // 元组类型的剩余元素
  type RestTupleType = [number, ...string[]];
  let restType: RestTupleType = [666, 'l', 'c', 'k'];
}