//

import { browser, by, element } from "protractor";

import { runner } from "../benchpress-runner";

const execute = () => {
  "Nothing to execute here";
};

describe("Random long script", () => {
  it('should randomly take time to run', () => {
    browser.ignoreSynchronization = true;

    const duration = 10 + (Math.random() * 150);
    const interval = 10 + (Math.random() * 150);

    browser.get(`${browser.baseUrl}?duration=${duration}&interval=${interval}`);

    // Force wait for DOMLoad
    browser.wait(() => element(by.id("root")).isPresent(), 10000);

    return runner.sample({
      id: `random-long-script`,
      execute,
    });
  });
});
