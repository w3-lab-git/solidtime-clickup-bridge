// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import { createBridge } from "../../src/clickup/bridge";
import { loadFixture } from "../support/loadFixture";

describe("disconnect", () => {
  it("removes every button and the injected style, so a reloaded extension leaves nothing dead behind", () => {
    loadFixture("synthetic/list-with-task-modal.html", "https://app.clickup.com/t/86c1aaaaa");
    const bridge = createBridge(
      document,
      vi.fn(async () => {}),
      { requireTrustedClicks: false },
    );
    bridge.sync();
    expect(document.querySelectorAll("[data-solidtime-bridge]").length).toBeGreaterThan(0);
    bridge.disconnect();
    expect(document.querySelectorAll("[data-solidtime-bridge]")).toHaveLength(0);
    expect(document.getElementById("solidtime-bridge-style")).toBeNull();
  });

  it("stops re-adding buttons when ClickUp re-renders afterwards", async () => {
    loadFixture("synthetic/list-with-task-modal.html", "https://app.clickup.com/t/86c1aaaaa");
    const bridge = createBridge(
      document,
      vi.fn(async () => {}),
      { requireTrustedClicks: false },
    );
    bridge.sync();
    bridge.disconnect();
    document.body.appendChild(document.createElement("div"));
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(document.querySelectorAll("[data-solidtime-bridge]")).toHaveLength(0);
  });
});
