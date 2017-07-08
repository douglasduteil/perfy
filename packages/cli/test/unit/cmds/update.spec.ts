//

import { Container } from 'inversify';
import * as yargs from 'yargs';

import { handlerFactory } from 'src/cmds/update';

import { Database, ReporterCopy, ReporterResolver } from '@perfyjs/core';

//

//

test('should report', async () => {
  // given

  const testContainer = new Container();
  const handler = handlerFactory(testContainer);

  const databaseMock = {
    instanciate: jest.fn()
  };
  testContainer.unbind(Database);
  testContainer.bind(Database).toConstantValue(databaseMock as any);

  const reporterCopyMock = {
    copy: jest.fn().mockReturnValue(Promise.resolve())
  };
  testContainer.unbind(ReporterCopy);
  testContainer.bind(ReporterCopy).toConstantValue(reporterCopyMock as any);

  const reporterResolverMock = {
    resolve: jest.fn().mockReturnValue('path/to/web_report')
  };
  testContainer.unbind(ReporterResolver);
  testContainer.bind(ReporterResolver).toConstantValue(reporterResolverMock as any);

  // when
  await handler(yargs);

  // then
  expect(databaseMock.instanciate).toHaveBeenCalled();
  expect(reporterResolverMock.resolve).toHaveBeenCalled();
  expect(reporterCopyMock.copy).toHaveBeenCalledWith('path/to/web_report', 'perfy_report');
});

//
/*
import { test} from 'ava';
import { sandbox } from 'sinon';

import { handlerFactory, IHandlerFactoryContext } from 'src/cmds/update\''

//

test.beforeEach((t) => {
  t.context = {
    database: () => {},
    log: {silly() {}, error() {}},
    update: () => {}
  } as any as Partial<IHandlerFactoryContext>;
});

test('should update the database', async (t) => {
  const sandpit = sandbox.create();
  const mocks = sandpit.mock(t.context);

  mocks.expects('database')
    .once().resolves();
  mocks.expects('update')
    .once().resolves();

  const handler = handlerFactory(t.context);

  await handler([]);

  t.notThrows(sandpit.verify.bind(sandpit));
});

test('should fail updating the database', async (t) => {
  const sandpit = sandbox.create();
  const mocks = sandpit.mock(t.context);

  mocks.expects('database')
    .once().resolves();
  mocks.expects('update')
    .once().rejects();
  sandpit.mock(t.context.log)
    .expects('error').once();

  const handler = handlerFactory(t.context);

  await handler([]);

  t.notThrows(sandpit.verify.bind(sandpit));
});
*/
