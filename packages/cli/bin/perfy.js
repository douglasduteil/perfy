#!/usr/bin/env node
const { dirname, resolve } = require('path');
const root = resolve(__dirname, '..');
const { main } = require(resolve(root, 'package.json'));
const apiRoot = dirname(resolve(root, main));
const { cli } = require(resolve(apiRoot, 'cli.js'));

const { flags } = cli.parse(process.argv.slice(1));
console.log('cli options', flags)
const api = require(resolve(apiRoot, 'index.js'));


