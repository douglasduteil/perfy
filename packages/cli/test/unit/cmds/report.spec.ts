//

import { Container } from 'inversify';
import * as yargs from 'yargs';

import { handlerFactory } from 'src/cmds/report';

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
