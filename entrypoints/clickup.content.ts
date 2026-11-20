import { browser } from "wxt/browser";
import { defineContentScript } from "wxt/utils/define-content-script";
import { createBridge } from "../src/clickup/bridge";
import { showToast } from "../src/clickup/toast";
import { uniqueTaskIds } from "../src/core/taskId";
import type { ClickUpTask } from "../src/core/timerToggle";
import type { Request, State, ToggleResponse } from "../src/messages";

/**
 * Re-check while the tab is visible, to catch timers stopped/started in Solidtime or
 * the desktop app. The background shares one API call between all tabs per interval.
 */
const POLL_MS = 10_000;
/** Coalesces bursts (several tabs, focus + visibilitychange) into one API call. */
const FRESH_MS = 1_000;

export default defineContentScript({
  matches: ["https://app.clickup.com/*"],
  runAt: "document_idle",
  main(ctx) {
    const bridge = createBridge(document, toggle);

    /**
     * After the extension is reloaded or updated, this copy in an already-open tab is cut off
     * from the background. ctx.isInvalid notices that, runs onInvalidated (removes the buttons)
     * and stops the polling, instead of throwing "Extension context invalidated" every 10 s.
     */
    async function send<T>(request: Request): Promise<T | undefined> {
      if (ctx.isInvalid) return undefined;
      try {
        return (await browser.runtime.sendMessage(request)) as T;
      } catch (error) {
        if (ctx.isInvalid) return undefined;
        throw error;
      }
    }

    async function toggle(task: ClickUpTask) {
      const response = await send<ToggleResponse>({ type: "toggle", task });
      if (!response) showToast(document, "Solidtime for ClickUp was updated. Refresh this page to use it.");
      else if (!response.ok) showToast(document, response.error);
      else if (response.warning) showToast(document, response.warning);
    }

    function apply(state: State | undefined) {
      const ids = state?.configured && Array.isArray(state.activeTaskIds) ? state.activeTaskIds : [];
      bridge.setActiveTaskIds(uniqueTaskIds(ids));
    }

    /** maxAgeMs keeps background polling cheap; user-driven refreshes pass a small value. */
    async function refresh(maxAgeMs?: number) {
      if (document.visibilityState !== "visible") return;
      const state = await send<State>({ type: "getState", maxAgeMs });
      if (state) apply(state);
    }

    // State pushes from our background (e.g. a timer started in another tab).
    browser.runtime.onMessage.addListener((message: unknown, sender) => {
      if (sender.id !== browser.runtime.id || sender.tab) return;
      const { type, state } = (message ?? {}) as { type?: unknown; state?: State };
      if (type === "state") apply(state);
    });

    // Catch timers started/stopped in the desktop app or web UI.
    ctx.addEventListener(document, "visibilitychange", () => void refresh(FRESH_MS));
    ctx.addEventListener(window, "focus", () => void refresh(FRESH_MS));
    // Accept only half-interval-old state, so a recent click never makes a poll skip a
    // round (worst case: a change shows within one interval). Other tabs still share calls.
    ctx.setInterval(() => void refresh(POLL_MS / 2), POLL_MS);
    ctx.onInvalidated(() => bridge.disconnect());

    bridge.sync();
    void refresh(FRESH_MS);
  },
});
