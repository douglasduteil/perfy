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
