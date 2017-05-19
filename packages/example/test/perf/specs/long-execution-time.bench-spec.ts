//

import { browser, by, element } from 'protractor';

import { runner } from '../benchpress-runner';

const execute = () => {
  'Nothing to execute here';
};

const testPars = [
  // [ duration, interval ]
  [10, 10],
  [50, 10],
  [100, 10],
  [150, 10]
];

describe('Long execution time', () => {
  testPars.forEach(benchProcess);
});

function benchProcess([duration, interval]: [number, number]): void {
  it(`${duration}ms process every ${interval}ms`, () => {
    browser.ignoreSynchronization = true;
    browser.get(`${browser.baseUrl}?duration=${duration}&interval=${interval}`);

    // Force wait for DOMLoad
    browser.wait(() => element(by.id('root')).isPresent(), 10000);

    return runner.sample({
      id: `long-execution-time?duration=${duration}&interval=${interval}`,
      execute
    });
  });
}
