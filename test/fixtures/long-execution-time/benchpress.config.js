'use strict';

const path = require('path');

const mkdirpSync = require('mkdirp').sync;
const delSync = require('del').sync;

const defaultBenchpressOptionsFn = require('../../../benchpress.config.js').options;
const perfyConfig = require('./perfy.conf.js').config;

const tmpReportDir = path.join(perfyConfig.reportsFolder, 'reports');

delSync(perfyConfig.reportsFolder);
mkdirpSync(perfyConfig.reportsFolder);
mkdirpSync(tmpReportDir);

exports.options = function longExecutionTimeBenchpressOptionsFn(benchpress) {
	const defaultOptions = defaultBenchpressOptionsFn(benchpress);

	return [
		...defaultOptions,
        {provide: benchpress.JsonFileReporter.PATH, useValue: tmpReportDir}
	];
};