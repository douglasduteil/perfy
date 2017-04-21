//

import { test } from "ava";

import { foo } from "../src";

//

test("should work", (t) => {
  t.is(foo(), "bar");
});
