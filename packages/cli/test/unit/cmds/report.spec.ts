//
//

import { test } from 'ava';
import { sandbox } from 'sinon';

import { handlerFactory, IHandlerFactoryContext } from '../../../src/cmds/report';

//

test.beforeEach((t) => {
  t.context = {
    copy: () => {},
    database: () => {},
    resolve: () => {},
    log: {silly() {}, error() {}}
  } as any as Partial<IHandlerFactoryContext>;
});

test('should report ', async (t) => {
  const sandpit = sandbox.create();
  const mocks = sandpit.mock(t.context);

  mocks.expects('resolve').once().withArgs('web').returns('path/to/web_report');
  mocks.expects('copy').once().withArgs('path/to/web_report', 'perfy_report').resolves();

  const handler = handlerFactory(t.context);

  await handler([]);

  t.notThrows(sandpit.verify.bind(sandpit));
});
