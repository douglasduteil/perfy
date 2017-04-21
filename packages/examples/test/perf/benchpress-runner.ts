
import {
  ConsoleReporter,
  // JsonFileReporter,
  MultiReporter,
  Options,
  RegressionSlopeValidator,
  Runner,
  SeleniumWebDriverAdapter,
  Validator,
} from "@angular/benchpress";

export const runner = new Runner([
  // use protractor as Webdriver client
  SeleniumWebDriverAdapter.PROTRACTOR_PROVIDERS,

  // use RegressionSlopeValidator to validate samples
  { provide: Validator, useExisting: RegressionSlopeValidator },

  // use 10 samples to calculate slope regression
  { provide: RegressionSlopeValidator.SAMPLE_SIZE, useValue: 10 },

  // use the 'renderTime' metric to calculate slope regression
  { provide: RegressionSlopeValidator.METRIC, useValue: "scriptTime" },
  { provide: Options.FORCE_GC, useValue: true },

  // Add Reporters : Console + Json
  // JsonFileReporter.PROVIDERS,

  // Make sure this folder is already created and writable
  // { provide: JsonFileReporter.PATH, useValue: "./perf_reports/data/" },
  MultiReporter.provideWith([
    ConsoleReporter,
    // JsonFileReporter,
  ]),
]);
