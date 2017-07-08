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
