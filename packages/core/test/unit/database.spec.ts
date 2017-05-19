//

import { test } from 'ava';

import { IDatabase } from '../../src/typings';

import { database } from '../../src/database';

//

const filename = 'thie file should not be written';
const testingLowDbOption: Lowdb.Options = {
  storage: require('lowdb/lib/storages/memory.js')
};

//

test('should return empty suites by default', (t) => {
  const db = database(filename, testingLowDbOption);

  t.deepEqual (db.value<IDatabase>(), { suites: {} });
});
