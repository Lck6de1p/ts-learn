type Mutable<Obj> = {
  -readonly [Key in keyof Obj]: Obj[Key];
};

type Zip3<Target extends unknown[], Source extends unknown[]> = Target extends [
  infer One,
  ...infer Rest1
]
  ? Source extends [infer Two, ...infer Rest2]
    ? [[One, Two], ...Zip3<Rest1, Rest2>]
    : []
  : [];
type Zip3Res = Zip3<[1, 2, 3], [4, 5, 6]>;

function zip3(target: unknown[], source: unknown[]): unknown[];
function zip3<
  Target extends readonly unknown[],
  Source extends readonly unknown[]
>(target: Target, source: Source): Zip3<Mutable<Target>, Mutable<Source>>;
function zip3(target: unknown[], source: unknown[]) {
  if (!target.length || !source.length) return [];
  const [one, ...rest1] = target;
  const [two, ...rest2] = source;
  return [[one, two], ...zip3(rest1, rest2)];
}

const zip3Res = zip3([1, 2, 3] as const, [4, 6, 7] as const);
const zip3Arr1 = [1, 2, 3];
const zip3Arr2 = [4, 5, 6];
const zip3Res1 = zip3(zip3Arr1, zip3Arr2);
