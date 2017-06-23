//

import { Container } from 'inversify';
import { mock } from 'sinon';
import Lowdb = require('lowdb');

import { DatabaseDump } from 'src/database-dump';
import { Logger, SilentLogger } from 'src/logger';
import { IPerfySuites } from '@perfyjs/types';

//

const fakeFsExtra = { writeJson: Function.prototype };
const testingLowDbOption: Lowdb.Options = {
  storage: require('lowdb/lib/storages/memory.js')
};

//

test('should dump an empty suites-index.json file', async () => {
  // given
  const container = new Container();
  container.bind(DatabaseDump.COPY_FS).toConstantValue(fakeFsExtra);
  container.bind(DatabaseDump).toSelf();
  container.bind(Logger).to(SilentLogger);

  const fakeDatabase = new Lowdb('in memory db', testingLowDbOption)
    .defaults({ suites: {} });

  const databaseDump = container.get(DatabaseDump);

  // expect
  const mockFsExtra = mock(fakeFsExtra);
  const writeJsonExpect = mockFsExtra.expects('writeJson')
  writeJsonExpect.once().withArgs('dist/suites.json', {  }).resolves();

  // when
  await databaseDump.dump(fakeDatabase, 'dist');

  // verify
  expect(() => mockFsExtra.verify()).not.toThrow();
});

test.only('should dump the foo and bar suite', async () => {
  // given
  const ff = jest.fn().mockReturnValue(Promise.resolve());
  const container = new Container();
  container.bind(DatabaseDump.COPY_FS).toConstantValue({ writeJson: ff});
  container.bind(DatabaseDump).toSelf();
  container.bind(Logger).to(SilentLogger);

  const suites: IPerfySuites = {
    foo: {name: 'Foo', cases: [{id: 'foo iterations', iterations: []}]},
    bar: {name: 'Bar', cases: [{id: 'bar iterations', iterations: []}]}
  };

  const fakeDatabase = new Lowdb('in memory db', testingLowDbOption)
    .defaults({ suites });

  const databaseDump = container.get(DatabaseDump);

  // when
  await databaseDump.dump(fakeDatabase, 'dist');

  // verify
  expect(ff.mock.calls).toMatchSnapshot();
});
