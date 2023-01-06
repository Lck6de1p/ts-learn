type BEM<
  Block extends string,
  Ele extends string[],
  Modifiers extends string[]
> = `${Block}__${Ele[number]}--${Modifiers[number]}`;

type BEMRes = BEM<"ts", ["a", "b"], ["success", "warning"]>;

type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never;
type AllCombinationsRes = AllCombinations<"a" | "b" | "c">;

/**
 * A extends A 不是没意义，意义是取出联合类型中的单个类型放入 A
   A extends A 才是分布式条件类型， [A] extends [A] 就不是了，只有左边是单独的类型参数才可以。 
 * 
 * 
 */