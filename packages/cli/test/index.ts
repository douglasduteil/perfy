//

import {resolve} from "path";

import { test } from "ava";
import * as execa from "execa";

import { run } from "../src";

//

const fixturePath = resolve(__dirname, "../../fixture.js");
test("should return default config", (t) => {
  const cli = run();

  t.regex(cli.help, /\Usage\s+\$ perfy/);
});

test("should return default config", async (t) => {
  const {stdout} = await execa(fixturePath, []);
  t.is(stdout, "");
});
