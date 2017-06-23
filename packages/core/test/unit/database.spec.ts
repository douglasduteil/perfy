//

import { Container } from 'inversify';

import { IDatabase } from 'src/typings';

import { Database } from 'src/database';
import { Logger, SilentLogger } from 'src/logger';

//

const filename = 'thie file should not be written';
const testingLowDbOption: Lowdb.Options = {
  storage: require('lowdb/lib/storages/memory.js')
};

//

test('should return empty suites by default', () => {
  // given
  const container = new Container();
  container.bind(Database.FILE_NAME).toConstantValue(filename);
  container.bind(Database.LOWDB_OPTIONS).toConstantValue(testingLowDbOption);
  container.bind(Database).toSelf();
  container.bind(Logger).to(SilentLogger);

  const database = container.get(Database);

  // when
  database.instanciate();

  const db = database.instance;

  // then
  expect(db.value<IDatabase>()).toEqual({ suites: {} });
});

test('should throw if not initialized', () => {
  // given
  const container = new Container();
  container.bind(Database.FILE_NAME).toConstantValue(filename);
  container.bind(Database.LOWDB_OPTIONS).toConstantValue(testingLowDbOption);
  container.bind(Database).toSelf();
  container.bind(Logger).to(SilentLogger);

  // when
  const database = container.get(Database);

  // then
  expect(() => database.instance).toThrowErrorMatchingSnapshot();
});
