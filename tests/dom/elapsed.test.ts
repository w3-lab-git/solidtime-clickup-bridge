// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { createBridge, type Bridge } from "../../src/clickup/bridge";
import { loadFixture } from "../support/loadFixture";

let bridge: Bridge | null = null;
afterEach(() => {
  bridge?.disconnect();
  vi.useRealTimers();
});

function detailElapsed(): string | null | undefined {
  const host = document.querySelector<HTMLElement>('[data-solidtime-bridge="detail"]')!;
  return host.shadowRoot!.querySelector(".elapsed")?.textContent;
}

function start() {
  loadFixture("synthetic/task-page-custom-id.html", "https://app.clickup.com/t/9012345/MKT-42");
  bridge = createBridge(
    document,
    vi.fn(async () => {}),
    { requireTrustedClicks: false },
  );
  bridge.sync();
}

describe("elapsed time on the task view button", () => {
  it("shows the running time and ticks every second", () => {
    vi.useFakeTimers({ now: new Date("2026-11-20T10:12:34Z") });
    start();
    bridge!.setActiveTaskIds(["MKT-42"], "2026-11-20T10:00:00Z");
    expect(detailElapsed()).toBe("0:12:34");
    vi.advanceTimersByTime(2000);
    expect(detailElapsed()).toBe("0:12:36");
  });

  it("shows no time while another task is running", () => {
    start();
    bridge!.setActiveTaskIds(["86c1other"], new Date().toISOString());
    expect(detailElapsed()).toBeUndefined();
  });

  it("removes the time when the timer stops", () => {
    start();
    bridge!.setActiveTaskIds(["MKT-42"], new Date().toISOString());
    bridge!.setActiveTaskIds([], null);
    expect(detailElapsed()).toBeUndefined();
  });

  it("keeps the Stop button without a time when the start is unknown", () => {
    start();
    bridge!.setActiveTaskIds(["MKT-42"], "not a date");
    expect(detailElapsed()).toBe("");
  });
});
