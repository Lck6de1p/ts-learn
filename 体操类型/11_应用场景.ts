type Data = {
  a: number;
  b: string;
  d: {
    e: boolean;
  };
};

const data: Data = {
  a: 1,
  b: "1",
  d: {
    e: true,
  },
  // c: "2", // error
};

type DeepRecord<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key] extends Record<string, any>
    ? DeepRecord<Obj[Key]> & Record<string, any>
    : Obj[Key];
} & Record<string, any>;

const data1: DeepRecord<Data> = {
  a: 1,
  b: "1",
  c: "2",
  d: {
    e: true,
  },
};

type GenerateType<Keys extends string> = {
  [Key in Keys]: {
    [Key2 in Key]: "desc" | "asc";
  } & {
    [Key3 in Exclude<Keys, Key>]: false;
  };
}[Keys];

type GenerateTypeRes = GenerateType<"aaa" | "bbb">;


const newObj = {
  a: 1
} 