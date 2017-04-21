//

import { browser, by, element } from "protractor";

describe("Long execution time", () => {
  it("10ms process every 10ms", async () => {
      browser.ignoreSynchronization = true;
      browser.get(`${browser.baseUrl}?duration=10&interval=10`);

      // Force wait for DOMLoad
      browser.wait(() => element(by.id("root")).isPresent(), 10000);
  });
});

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

    it("10ms process every 10ms", async((done) => {
        browser.ignoreSynchronization = true;
        await(browser.get(`${TEST.ADDRESS}?duration=10&interval=10`));

        // Force wait for DOMLoad
        browser.wait(() => element(by.id("root")).isPresent(), 10000);

        runner.sample({
            id: "long-execution-time-d10-i10",
            execute: async(executionBlock),
        }).then(done, done.fail);

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
