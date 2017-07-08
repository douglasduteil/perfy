#!/usr/bin/env node

//

import 'reflect-metadata';

//

import * as Debug from 'debug';

import { yargsParser } from './parser';


//

const debug = Debug('@perfyjs/cli:cli');

//

debug('launched');

const parse = yargsParser();

parse(process.argv);
