// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { createBridge, type Bridge } from "../../src/clickup/bridge";
import { findRows, readRowTask } from "../../src/clickup/read";
import { SELECTORS } from "../../src/clickup/selectors";
import { loadFixture } from "../support/loadFixture";

const URL = "https://app.clickup.com/9012345/v/l/6-901-1";

let bridge: Bridge | null = null;
afterEach(() => bridge?.disconnect());

const rowHosts = () => Array.from(document.querySelectorAll<HTMLElement>('[data-solidtime-bridge="row"]'));

describe("ClickUp's newer List view (list-view-v3)", () => {
  it("reads every task row", () => {
    loadFixture("synthetic/list-view-v3.html", URL);
    expect(findRows().map(readRowTask)).toMatchObject([
      { id: "86c1fffff", title: "Fix checkout total", location: { space: "Clients", list: "Bugs" } },
      { id: "86c1ggggg", title: "Broken coupon field", location: { space: "Clients", list: "Bugs" } },
    ]);
  });

  it("puts the button at the end of the name cell's flex row, not inside the one-column name grid", () => {
    loadFixture("synthetic/list-view-v3.html", URL);
    bridge = createBridge(
      document,
      vi.fn(async () => {}),
      { requireTrustedClicks: false },
    );
    bridge.sync();
    const hosts = rowHosts();
    expect(hosts.map((h) => h.dataset.taskId)).toEqual(["86c1fffff", "86c1ggggg"]);
    for (const host of hosts) {
      expect(host.parentElement?.className).toBe("cu-task-name-cell__main");
      expect(host.parentElement?.lastElementChild).toBe(host);
      expect(host.closest("cu-task-row-main")).toBeNull();
    }
  });

  it("reveals the button when hovering the table row", () => {
    loadFixture("synthetic/list-view-v3.html", URL);
    expect(document.querySelectorAll(SELECTORS.rowHover)).toHaveLength(2);
  });
});
