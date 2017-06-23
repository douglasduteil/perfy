//

import { Container } from 'inversify';
import { mock } from 'sinon';

import { Logger, SilentLogger } from 'src/logger';
import { ReporterCopy } from 'src/reporter-copy';

//

const fakeFsExtra = { copy: Function.prototype };

//

test('should copy a folder foo to bar', async () => {
  // given
  const container = new Container();
  container.bind(ReporterCopy.COPY_FS).toConstantValue(fakeFsExtra);
  container.bind(Logger).to(SilentLogger);
  container.bind(ReporterCopy).toSelf();
  const reporterCopy = container.get(ReporterCopy);

  // expect
  const mockFsExtra = mock(fakeFsExtra);
  mockFsExtra.expects('copy').once().withArgs('foo', 'bar');

  // then
  await reporterCopy.copy('foo', 'bar');

  // verify
  expect(() => mockFsExtra.verify()).not.toThrow();
});
