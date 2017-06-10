//

import {resolve} from 'path';

import { test } from 'ava';
import * as execa from 'execa';

import launcher from '../../src/index';

//

const fixturePath = resolve(__dirname, '../../../fake-bin.js');

//

test('should have a default launcher', async (t) => {
  t.is(typeof launcher, 'function');
  t.pass('This ensure that typescipt will build the index file for the fake-bin');
});

test('should return default config', async (t) => {
  const {stdout} = await execa(fixturePath).catch((e) => ({ stdout: e.message }));
  t.regex(stdout, /Not enough non-option arguments: got 0, need at least 1/);
});
