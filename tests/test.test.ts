import { assertArrayIncludes, assertEquals } from "../utils/deps.ts";

Deno.test("hello world", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
  assertArrayIncludes([1, 2, 3, 4, 5, 6], [3], "Expected 3 to be in the array");
});
