//

import { test} from 'ava';
import { sandbox, SinonExpectation, SinonSandbox } from 'sinon';

import * as core from '@perfyjs/core';
import { handler } from '../../../src/cmds/report';
import { log } from '../../../src/logger';

//

test.serial('should upate the database', async (t) => {
  const {
    databaseMock,
    sandpit,
    updateMock
  } = t.context;

  databaseMock.resolves();
  updateMock.resolves();

  await handler([]);

  t.notThrows(sandpit.verify.bind(sandpit));
});

test.serial('should upate the database', async (t) => {
  const {
    databaseMock,
    sandpit,
    updateMock
  } = t.context as ITestContext;

  databaseMock.returns({});
  updateMock.rejects(new Error('Nope nope'));
  sandpit.mock(log).expects('error').once();

  await handler([]);

  t.notThrows(sandpit.verify.bind(sandpit));
});

//

test.afterEach((t) => {
  const {sandpit} = t.context as ITestContext;

  sandpit.restore();
});

test.beforeEach((t) => {
  const sandpit = sandbox.create();

  const coreMock = sandpit.mock(core);
  const databaseMock = coreMock.expects('database').once();
  const updateMock = coreMock.expects('update').once();

  const context: ITestContext = {
    databaseMock,
    sandpit,
    updateMock
  };

  t.context = context;
});

interface ITestContext {
  databaseMock: SinonExpectation;
  sandpit: SinonSandbox;
  updateMock: SinonExpectation;
}
