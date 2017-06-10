import Lowdb = require('lowdb');

// import { IDatabase } from './typings';

export function databaseDump(database: Lowdb) {
  return () => Promise.resolve(database);
}
