//

import { browser, by, element } from "protractor";

import { runner } from "../benchpress-runner";

const execute = () => {
  "Nothing to execute here";
};

const testPars = [
  // [ duration, interval ]
  [10, 10],
  [50, 10],
];

describe("Long execution time", () => {
  testPars.forEach(benchProcess);
});

function benchProcess([duration, interval]: [number, number]): void {
  it(`${duration}ms process every ${interval}ms`, () => {
    browser.ignoreSynchronization = true;
    browser.get(`${browser.baseUrl}?duration=${duration}&interval=${interval}`);

    // Force wait for DOMLoad
    browser.wait(() => element(by.id("root")).isPresent(), 10000);

    return runner.sample({
      id: ` long-execution-time-d${duration}-i${interval}`,
      execute,
    });
  });
}

/*
import benchpress from '@angular/benchpress';
import async from 'asyncawait/async';
import await from 'asyncawait/await';
import config from './benchpress.config.js';

const runner = new benchpress.Runner(config.options(benchpress));

const TEST = {
    ADDRESS: "http://localhost:9999/test/fixtures/long-execution-time/playground/index.html",
};

const executionBlock = () => {
    // run code here
};

describe("Long execution time", function() {
    afterEach(async(() => {
        await(browser.quit());
    }));

    it("50ms process every 10ms", async((done) => {
        browser.ignoreSynchronization = true;
        await(browser.get(`${TEST.ADDRESS}?duration=50&interval=10`));

        // Force wait for DOMLoad
        browser.wait(() => element(by.id("root")).isPresent(), 10000);

        runner.sample({
            id: "long-execution-time-d50-i10",
            execute: async(executionBlock),
        }).then(done, done.fail);
    }));

    it("100ms process every 10ms", async((done) => {
        browser.ignoreSynchronization = true;
        await(browser.get(`${TEST.ADDRESS}?duration=100&interval=10`));

        // Force wait for DOMLoad
        browser.wait(() => element(by.id("root")).isPresent(), 10000);

        runner.sample({
            id: "long-execution-time-d100-i10",
            execute: async(executionBlock),
        }).then(done, done.fail);
    }));

    it("150ms process every 10ms", async((done) => {
        browser.ignoreSynchronization = true;
        await(browser.get(`${TEST.ADDRESS}?duration=150&interval=10`));

        // Force wait for DOMLoad
        browser.wait(() => element(by.id("root")).isPresent(), 10000);

        runner.sample({
            id: "long-execution-time-d150-i10",
            execute: async(executionBlock),
        }).then(done, done.fail);
    }));
});
*/
