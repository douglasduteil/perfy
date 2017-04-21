const { dirname, relative } = require('path');
const { SpecReporter } = require('jasmine-spec-reporter');

const { launchServer } = require('../../server');

exports.config = {
  specs: [
    './specs/**/*.bench-spec.ts'
  ],

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      'args': [
        '--js-flags=--expose-gc',
        '--enable-gpu-benchmarking',
        '--enable-thread-composting'
      ],
      'perfLoggingPrefs': {
        'traceCategories': 'v8,blink.console,devtools.timeline'
      }
    },
    loggingPrefs: {
      'browser': 'ALL',
      'driver': 'ALL',
      'performance': 'ALL'
    }
  },

  // restart browser between tests
  // so that the browser does not keep
  // optimizations
  restartBrowserBetweenTests: true,

  directConnect: true,

  framework: 'jasmine2',

  // will be dynamicly found
  // baseUrl: 'http://localhost:4200/',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 1000 * 60 * 2, // 2 min
    print() { }
  },

  beforeLaunch() {
    require('ts-node').register({
      project: 'test/perf/tsconfig.json'
    });
  },

  onCleanUp() {
  },

  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    return Promise.all([
      launchServer().then(({ baseUrl }) => browser.baseUrl = baseUrl)
    ]);
  },

  perfy: {
    reportsFolder: './perf_reports',
    reportsDataFolder: './perf_reports/data',
    reportsFiles: './perf_reports/data/*_*.json'
  }
};
