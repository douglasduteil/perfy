//
import * as path from 'path';

import { Container } from 'inversify';
import { stub } from 'sinon';

import { Logger, SilentLogger } from 'src/logger';
import { ReporterResolver } from 'src/reporter-resolver';

//

const rootPath = path.resolve('');
const reporterPath = path.join(rootPath, 'fake_node_modules/@perfyjs/reporter-foo');

//

test('should resolve @perfyjs/reporter-foo', () => {
  // given
  const container = new Container();
  container.bind(ReporterResolver).toSelf();
  container.bind(Logger).to(SilentLogger);
  container.bind(ReporterResolver.MODULE_RESOLVER).toConstantValue({
    resolve: stub().returns(`${reporterPath}/index.js`)
  });

  const reporterResolver = container.get(ReporterResolver);

  // when
  const expectedPath = reporterResolver.resolve('foo');

  // then
  expect(expectedPath).toBe(path.join(reporterPath, 'dist'));
});
