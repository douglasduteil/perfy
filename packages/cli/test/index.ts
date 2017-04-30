//

import {resolve} from "path";

import { test } from "ava";
import * as execa from "execa";

import parse from "../src";

//

const fixturePath = resolve(__dirname, "../../fake-bin.js");

//

test("should return default config", (t) => {
  const cli = parse([]);

  t.regex(cli.help, /\Usage\s+\$ perfy/);
});

test("should return default config", async (t) => {
  const {stdout} = await execa(fixturePath, []);
  t.is(stdout, "");
});
