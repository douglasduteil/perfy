//

import Lowdb = require('lowdb');

export interface IDatabase {
  suites: {};
}

export interface IUpdateOptionType {
  cwd: string;
  database: Lowdb;
  pattern: string;
  reportsFolder: string;
}

export interface IPerfySuites {
  [id: string]: IPerfySuite;
}

export interface IPerfySuite {
  cases: ITestCase[];
  name: string;
}

export interface ITestCase {
  id: string;
  cases: IBenchpressIteration[];
}

export interface IBenchpressIteration {
  timestamp: string;
  description: {
    id: string;
    metrics: {[name: string]: string};
    description: {[name: string]: string};
    stats: {[name: string]: string};
  };

  validSample: any[];
  completeSample: any[];
}
