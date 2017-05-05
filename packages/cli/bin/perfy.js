#!/usr/bin/env node
const { dirname, resolve } = require('path');
const root = resolve(__dirname, '..');
const { main } = require(resolve(root, 'package.json'));
const apiRoot = dirname(resolve(root, main));

require(resolve(apiRoot, 'index.js')).default();
