
export = fixtureCasesExtract;
declare function fixtureCasesExtract(options: Options): TestFixtures[];
declare namespace fixtureCasesExtract {
}

interface Options {
  basePath: string;
  fileMap: {
    [name: string]: string
  }
}

interface TestFixtures {
  name: string;
  base: string;
  [name: string]: string
}
