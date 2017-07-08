#!/usr/bin/env node

const { dirname, resolve } = require('path');

const root = resolve(__dirname, '..');
const { main } = require(resolve(root, 'package.json'));
const apiRoot = resolve(root, main);

require(apiRoot).default();
