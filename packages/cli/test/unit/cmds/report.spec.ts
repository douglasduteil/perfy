//
//

import { test } from 'ava';
import { sandbox } from 'sinon';

import { Reporter } from '@perfyjs/core';

import { handlerFactory, IHandlerFactoryContext } from '../../../src/cmds/report';

//

test.beforeEach((t) => {
  t.context = {
    reporter: Reporter.prototype,
    log: {silly() {}, error() {}}
  } as any as Partial<IHandlerFactoryContext>;
});

test('should report ', async (t) => {
  const sandpit = sandbox.create();
  const mocks = sandpit.mock(t.context.reporter);

  mocks.expects('resolve').once().withArgs('web');
  mocks.expects('report').once().withArgs({}).resolves();

  const handler = handlerFactory(t.context);

  await handler([]);

  t.notThrows(sandpit.verify.bind(sandpit));
});
