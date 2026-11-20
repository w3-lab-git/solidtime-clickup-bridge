import type { ClickUpTask } from "./core/timerToggle";

/** Content script → background */
export type Request =
  /** maxAgeMs: accept a cached state up to this old (clamped to 1–15s). */
  { type: "getState"; maxAgeMs?: number } | { type: "toggle"; task: ClickUpTask };

export interface State {
  configured: boolean;
  /** All ClickUp ids of the task whose Solidtime entry is running (empty when none / not from ClickUp). */
  activeTaskIds: string[];
  /** Start of the running entry (ISO), for the elapsed time on the button; null when none. */
  activeStart?: string | null;
}

/** Background → content scripts (tabs.sendMessage). */
export interface StateMessage {
  type: "state";
  state: State;
}

export type ToggleResponse = { ok: true; warning?: string } | { ok: false; error: string };
