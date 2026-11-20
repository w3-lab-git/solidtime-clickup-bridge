import { describe, expect, it } from "vitest";
import { formatElapsed } from "../../src/core/text";

describe("formatElapsed", () => {
  it.each([
    [0, "0:00:00"],
    [59_999, "0:00:59"],
    [754_000, "0:12:34"],
    [36_061_000, "10:01:01"],
    [-5_000, "0:00:00"],
  ])("%d ms → %s", (ms, text) => expect(formatElapsed(ms)).toBe(text));
});
