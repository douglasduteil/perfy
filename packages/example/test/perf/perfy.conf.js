'use strict';

const path = require('path');

const { mkdir } = require('fs');

const publicDir = path.join(__dirname, '.public');

const reportsFolder = "./benchpress_reports";

// HACK(@douglasduteil): create the folder if not existing
// The "JsonFileReporter" won't create the report folder if it doesn't exist.
mkdir(reportsFolder, () => {
 // We ignore errors here...
 // like EEXIST for example...
 // Nope ! We don't care for now...
});

exports.config = {
	reportsFolder,
	reportsDataFolder: publicDir,
	reportsFiles: publicDir,
	pattern: '*.json'
};
