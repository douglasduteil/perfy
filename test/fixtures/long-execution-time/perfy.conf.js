'use strict';

const path = require('path');

const publicDir = path.join(__dirname, '.public');

exports.config = {
	reportsFolder: publicDir,
	reportsDataFolder: publicDir,
	reportsFiles: publicDir,
	pattern: '*_*.json'
};
