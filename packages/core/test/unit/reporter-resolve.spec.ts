//
import * as path from 'path';

import { test } from 'ava';
import { stub } from 'sinon';

import { context, factory } from '../../src/reporter-resolver';

//

test('should resolve @perfyjs/reporter-foo', (t) => {
  const rootPath = path.resolve('');

  const reporterPath = path.join(rootPath, 'fake_node_modules/@perfyjs/reporter-foo');
  const resolveFn = stub().returns(`${reporterPath}/index.js`);
  const resolve = factory({...context, resolveFn});

  const expectedPath = resolve('foo');

  t.is(expectedPath, path.join(reporterPath, 'dist'));
});
